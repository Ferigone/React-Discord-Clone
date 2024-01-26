import { Router } from "express";

// Import All Routes
import LoginRoute from "./routes/login";
import RegisterRoute from "./routes/register";
import AuthRoute from "./routes/auth";
import ServersRoute from "./routes/servers";
import UserRoute from "./routes/user";
import ServerRoute from "./routes/server";
import ChannelsRoute from "./routes/channels";
import ChannelRoute from "./routes/channel";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Dev Api v1" });
});

router.use("/login", LoginRoute);
router.use("/register", RegisterRoute);
router.use("/auth", AuthRoute);
router.use("/servers", ServersRoute);
router.use("/server", ServerRoute);
router.use("/user", UserRoute);
router.use("/channels", ChannelsRoute);
router.use("/channel", ChannelRoute);

export default router;
