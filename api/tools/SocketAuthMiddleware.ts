import { Socket } from "socket.io";
import UserSchema from "../mongo_schemas/UserSchema";
import AuthTokenManager from "./AuthTokenManager";

const SocketAuthMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void
) => {
  const token = socket.handshake.auth.token;
  let verifiedToken;
  try {
    verifiedToken = await AuthTokenManager.verifyToken(
      token,
      process.env.JWT_SECRET || ""
    );
  } catch (e) {
    next(new Error("401"));
  }

  if (verifiedToken) {
    const user = await UserSchema.findOne({ tokens: token });
    if (user) {
      socket.join(`user:${user._id.toString()}`);
      console.log("Authenticated user: " + user._id.toString());
      next();
    } else {
      next(new Error("401"));
    }
  } else {
    next(new Error("401"));
  }
};

export default SocketAuthMiddleware;
