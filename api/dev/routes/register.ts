import { Router } from "express";
import { hash } from "argon2";
import UserSchema from "../../mongo_schemas/UserSchema";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  if (!password)
    return res.status(400).json({ message: "Password is required" });

  const user = await UserSchema.findOne({ email });

  if (user) return res.status(400).json({ message: "User already exists" });

  try {
    const hashedPassword = await hash(password);
    const newUser = new UserSchema({ email, password: hashedPassword });
    await newUser.save();
    return res.json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
