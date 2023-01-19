import { Router } from "express";

// Import All Routes
import LoginRoute from "./routes/login";
import RegisterRoute from "./routes/register";
import AuthRoute from "./routes/auth";
import ServersRoute from "./routes/servers";
import UserRoute from "./routes/user";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Dev Api v1" });
});

router.use("/login", LoginRoute);
router.use("/register", RegisterRoute);
router.use("/auth", AuthRoute);
router.use("/servers", ServersRoute);
router.use("/user", UserRoute);

export default router;
