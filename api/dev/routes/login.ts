import { Router } from "express";
import UserSchema from "../../mongo_schemas/UserSchema";
import { verify } from "argon2";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  if (!password)
    return res.status(400).json({ message: "Password is required" });

  const user = await UserSchema.findOne({ email });

  if (!user) return res.status(400).json({ message: "User does not exist" });

  try {
    if (await verify(user.password, password)) {
      return res.json({ message: "Login successful" });
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
