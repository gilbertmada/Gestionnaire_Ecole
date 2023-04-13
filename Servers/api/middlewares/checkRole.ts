import { Request, Response, NextFunction } from "express";

import { User, IUser } from "../entity/User";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    let user;
    try {
      user = await User.findOne({ _id: id });
    } catch (err) {
      res.status(400).send("Could not check who you are");
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user?.role ?? "") > -1) next();
    else res.status(401).send("You don't have the permission to proceed");
  };
};
