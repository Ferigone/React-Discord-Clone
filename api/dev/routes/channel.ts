import { Router } from "express";
import { ObjectId } from "mongodb";
import ServerSchema from "../../mongo_schemas/ServerSchema";
import ChannelSchema from "../../mongo_schemas/ChannelSchema";
import UserSchema from "../../mongo_schemas/UserSchema";
import MessageSchema from "../../mongo_schemas/MessageSchema";
import * as xss from "xss";

const router = Router();

router.get("/", async (req, res) => {
  const { server } = req.query;
  const headers = req.headers;
  if (headers.authorization === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let token = headers.authorization.split(" ")[1];

  console.log(server);

  if (server === undefined)
    return res.status(400).json({ message: "Server id is required" });

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const channel = await ChannelSchema.findOne({
    _id: new ObjectId(server.toString()),
  });

  if (channel) {
    channel.messages = [];
  }

  return res.status(200).json({ channel: channel });
});

router.get("/:channel_id/messages", async (req, res) => {
  let channel_id;
  if (req.params) {
    channel_id = req.params.channel_id;
  }
  const { limit, before } = req.query;
  const headers = req.headers;

  if (headers.authorization === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let token = headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const user = await UserSchema.findOne({ tokens: token });

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (!channel_id)
    return res.status(400).json({ message: "Channel id is required" });

  try {
    channel_id = new ObjectId(channel_id.toString());
  } catch (e) {
    return res.status(400).json({ message: "Channel id is invalid" });
  }

  const channel = await ChannelSchema.findOne({
    _id: channel_id,
  });

  if (!channel) return res.status(404).json({ message: "Channel not found" });

  const server_id = channel.server_id;

  const server = await ServerSchema.findOne({
    _id: new ObjectId(server_id.toString()),
  });

  if (!server) return res.status(404).json({ message: "Server not found" });

  if (!server.members.includes(user._id))
    return res.status(403).json({ message: "Forbidden" });

  const messages = await MessageSchema.aggregate([
    {
      $match: {
        channel_id,
      },
    },
    {
      $sort: {
        timestamp: -1,
      },
    },
    {
      $skip: before ? parseInt(before.toString()) : 0,
    },
    {
      $limit: limit ? parseInt(limit.toString()) : 50,
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

  return res.status(200).json({ messages: messages });
});

router.post("/message", async (req, res) => {
  const { message, channel_id } = req.body;
  const headers = req.headers;
  if (headers.authorization === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let token = headers.authorization.split(" ")[1];

  if (message === undefined)
    return res.status(400).json({ message: "Message is required" });

  if (channel_id === undefined)
    return res.status(400).json({ message: "Channel id is required" });

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const user = await UserSchema.findOne({ tokens: token });

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const channel = await ChannelSchema.findOne({
    _id: new ObjectId(channel_id.toString()),
  });

  if (!channel) return res.status(404).json({ message: "Channel not found" });

  const newMessage = new MessageSchema({
    content: xss.filterXSS(message),
    author: user._id,
    channel_id: channel._id,
  });

  await newMessage.save();

  channel.messages.push(newMessage._id);
  await channel.save();

  return res.status(200).json({ message: "Message sent" });
});

export default router;
