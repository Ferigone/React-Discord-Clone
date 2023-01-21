import { Router } from "express";
import UserSchema from "../../mongo_schemas/UserSchema";
import AuthTokenManager from "../../tools/AuthTokenManager";

const router = Router();

router.post("/", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) return res.status(400).json({ message: "Token is required" });

  try {
    await AuthTokenManager.verifyToken(
      token as string,
      process.env.JWT_SECRET || ""
    );

    const user = await UserSchema.findOne({ tokens: token });
    console.log(user);
    if (!user)
      return res.status(400).json({ message: "Token is invalid or expired" });

    return res.status(200).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ message: "Token is invalid or expired" });
  }
});

export default router;
