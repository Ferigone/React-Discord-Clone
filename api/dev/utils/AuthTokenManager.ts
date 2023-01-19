// Create class to manage auth tokens using JWT
import * as jwt from "jsonwebtoken";
import UserSchema from "../../mongo_schemas/UserSchema";

class AuthTokenManager {
  private static instance: AuthTokenManager;
  private constructor() {}
  public static getInstance(): AuthTokenManager {
    if (!AuthTokenManager.instance) {
      AuthTokenManager.instance = new AuthTokenManager();
    }
    return AuthTokenManager.instance;
  }
  public async generateToken(payload: any, secret: string): Promise<string> {
    const token = await jwt.sign(payload, secret);
    // Check if token is not assigned to a user
    const user = await UserSchema.findOne({ tokens: token });
    if (user) {
      // If token is assigned to a user, generate a new one
      return await this.generateToken(payload, secret);
    }
    return token;
  }
  public async verifyToken(token: string, secret: string) {
    return jwt.verify(token, secret);
  }
}

export default AuthTokenManager.getInstance();
