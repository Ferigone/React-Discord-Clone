import { Router } from "express";
import { ObjectId } from "mongodb";
import ServerSchema from "../../mongo_schemas/ServerSchema";
import ChannelSchema from "../../mongo_schemas/ChannelSchema";
import UserSchema from "../../mongo_schemas/UserSchema";

const router = Router();

router.get("/", async (req, res) => {
  const { server } = req.query;
  const headers = req.headers;
  if (headers.authorization === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let token = headers.authorization.split(" ")[1];

  if (server === undefined)
    return res.status(400).json({ message: "Server id is required" });

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const user = await UserSchema.findOne({ tokens: token });

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  let server_id;

  try {
    server_id = new ObjectId(server.toString());
  } catch (e) {
    return res.status(400).json({ message: "Invalid server id" });
  }

  //  Check if user is in server
  const serverDoc = await ServerSchema.findOne({
    _id: server_id,
  });
  
  if (!serverDoc) return res.status(404).json({ message: "Server not found" });

  if (!serverDoc.members.includes(user._id))
    return res.status(401).json({ message: "Unauthorized" });

  const channels = await ChannelSchema.find({
    server_id: new ObjectId(server.toString()),
  });

  return res.status(200).json({ channels });
});

router.post("/", async (req, res) => {
  const { server_id, name } = req.body;

  if (server_id === undefined)
    return res.status(400).json({ message: "Server id is required" });

  if (name === undefined)
    return res.status(400).json({ message: "Channel name is required" });

  const server = await ServerSchema.findOne({ _id: new ObjectId(server_id) });

  if (!server) return res.status(404).json({ message: "Server not found" });

  const channel = new ChannelSchema({
    name,
    server_id,
  });
  await channel.save();

  server.channels.push(channel._id);
  await server.save();

  return res.status(200).json({ message: "Channel created" });
});

export default router;
