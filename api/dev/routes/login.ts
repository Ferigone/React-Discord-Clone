import { Router } from "express";
import UserSchema from "../../mongo_schemas/UserSchema";
import { verify } from "argon2";
import AuthTokenManager from "../utils/AuthTokenManager";

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
      const token = await AuthTokenManager.generateToken(
        { id: user.id },
        process.env.JWT_SECRET || ""
      );

      // Add token to user document and save
      user.tokens.push(token);
      await user.save();

      return res.json({ token });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
