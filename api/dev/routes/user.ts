import { Router } from "express";
import UserSchema from "../../mongo_schemas/UserSchema";

const router = Router();

router.get("/", async (req, res) => {
  const headers = req.headers;
  if (headers.authorization === undefined)
    return res.status(401).json({ message: "Unauthorized" });

  let token = headers.authorization.split(" ")[1];

    // Get user by token
    const user = await UserSchema.findOne({ tokens: token });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // Get user
    const parsedUser = {
        id: user._id,
        email: user.email,
        username: user.username,
    }

    return res.json({ user: parsedUser });
});

export default router;
