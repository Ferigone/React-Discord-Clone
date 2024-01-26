import 'module-alias/register';
import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import devApi from "./dev";

import MongoDBConnector from "./tools/mongoConnector";
import SocketAuthMiddleware from "./tools/SocketAuthMiddleware";

import ServerSchema from "./mongo_schemas/ServerSchema";
import MessageSchema from "./mongo_schemas/MessageSchema";

dotenv.config();
const API_PORT = 3333;

// Create expressjs and socket.io server
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const mongo = MongoDBConnector.getInstance();

// Setup cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Setup body parse
app.use(bodyParser.json());

// Setup routes
app.use("/api/v1", devApi);

// Setup socket.io middleware
io.of("/ws").use(SocketAuthMiddleware);

// Socket.io server
io.of("/ws").on("connection", (socket: any) => {
  socket.on("joinChannel", (channelId: string) => {
    console.log(`Client joined channel ${channelId}`);
    socket.join(`channel:${channelId}`);
  });
  socket.on("leaveChannel", (channelId: string) => {
    socket.leave(`channel:${channelId}`);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

ServerSchema.watch().on("change", (data: any) => {
  if (data.operationType === "delete") return;

  data.fullDocument?.members.forEach((member: Object) => {
    const id = member.toString();
    io.of("/ws").to(`user:${id}`).emit("server", data.fullDocument);
  });
});

MessageSchema.watch().on("change", async (data: any) => {
  if (data.operationType === "delete") return;

  if (data.fullDocument?.channel_id) {
    const message = await MessageSchema.aggregate([
      {
        $match: {
          _id: data.fullDocument._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },
      {
        $project: {
          content: "$content",
          timestamp: "$timestamp",
          author: {
            id: "$author._id",
            username: "$author.username",
          },
        },
      },
    ]);
    io.of("/ws")
      .to(`channel:${data.fullDocument.channel_id}`)
      .emit("message", message[0]);
  }
});

// Start server
server.listen(API_PORT, async () => {
  console.log(`Listening on port ${API_PORT}`);
  await mongo.connect(process.env.MONGODB_URL || "");
});
