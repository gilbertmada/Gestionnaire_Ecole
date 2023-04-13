import * as jwt from "jsonwebtoken";
import config from "config";

export const getUserIdFromToken = (token: string): string | null => {
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, config.get("jwtSecret"));
    return jwtPayload.userId;
  } catch (error) {
    return null;
  }
};
