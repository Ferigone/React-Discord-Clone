import { Router } from "express";
import { ObjectId } from "mongodb";
import UserSchema from "../../mongo_schemas/UserSchema";
import ServerSchema from "../../mongo_schemas/ServerSchema";

const router = Router();

router.get("/", async (req, res) => {
  let server_id; 
  const params = req.query;
  const headers = req.headers;
  if (headers.authorization === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (params.id === undefined) {
    return res.status(400).json({ message: "Server id is required" });
  }

  let token = headers.authorization.split(" ")[1];

  // Get user by token
  const user = await UserSchema.findOne({ tokens: token });
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try{
    server_id = new ObjectId(params.id.toString());
  } catch(e){
    return res.status(400).json({ message: "Invalid server id" });
  }

  // Get server
  const server = await ServerSchema.aggregate([
    {
      $match: {
        _id: server_id,
      },
    },
    {
      $unwind: "$members",
    },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members",
      },
    },
    {
      $unwind: "$members",
    },
    {
      $project: {
        _id: "$_id",
        name: "$name",
        members: {
          id: "$members._id",
          username: "$members.username",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        name: {
          $first: "$name",
        },
        members: {
          $push: "$members",
        },
      },
    },
  ]);
  if (!server) return res.status(404).json({ message: "Server not found" });

  // Check if user is a member of the server
  if (
    !server[0].members.find(
      (member: any) => member.id.toString() === user._id.toString()
    )
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json({ server: server[0] });
});

export default router;
