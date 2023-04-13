import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  let token = <string>req.headers["authorization"];

  if(!token){

    return  res.status(401).send({
      status: "ERROR",
      code: "TOKEN_REQUIRED",
      message: 'No token'
    });

  }
  
  token = token.replace("Bearer ", "");
  
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.get("jwtSecret"));
    res.locals.jwtPayload = jwtPayload;
  } catch (error: any) {
    //If token is not valid, respond with 423 (locked)
    res.status(423).send({
      status: "ERROR",  
      code: error.name,
      message: "Your token has expired"
    });
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.get("jwtSecret"), {
    expiresIn: "3h",
  });


  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};
