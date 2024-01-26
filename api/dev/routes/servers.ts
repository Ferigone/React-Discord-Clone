import { Router } from "express";
import UserSchema from "../../mongo_schemas/UserSchema";
import ServerSchema from "../../mongo_schemas/ServerSchema";

const router = Router();

router.post("/", async (req, res) => {
  const { name } = req.body;
  const headers = req.headers;
  if (headers.authorization === undefined)
    return res.status(401).json({ message: "Unauthorized" });

  let token = headers.authorization.split(" ")[1];

  // Get user by token
  const user = await UserSchema.findOne({ tokens: token });
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  // Check if user has permission to create a server
  if (!user.permissions.includes("CREATE_SERVER"))
    return res.status(401).json({ message: "Unauthorized" });
  // Create server
  let server = new ServerSchema({ name });
  server.owner_id = user._id;
  server.members.push(user._id);
  await server.save();


  return res.json({ message: "Server created successfully", server_id: server._id.toString() });
});

router.get('/', async (req, res) => {
    const headers = req.headers;
    if (headers.authorization === undefined)
        return res.status(401).json({ message: "Unauthorized" });

    let token = headers.authorization.split(" ")[1];

    // Get user by token
    const user = await UserSchema.findOne({ tokens: token });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // Get servers
    const servers = await ServerSchema.find({ members: user._id });

    
    return res.json({ servers });
})

export default router;
