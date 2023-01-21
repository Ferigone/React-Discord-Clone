import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import devApi from "./dev";

import MongoDBConnector from "./tools/mongoConnector";
import SocketAuthMiddleware from "./tools/SocketAuthMiddleware";

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
io.of("/ws").on("connection", (socket) => {
  console.log("Connect");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server
server.listen(API_PORT, async () => {
  console.log(`Listening on port ${API_PORT}`);
  await mongo.connect(process.env.MONGODB_URL || "");
});
