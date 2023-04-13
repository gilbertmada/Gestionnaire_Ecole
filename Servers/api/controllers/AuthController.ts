import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { PasswordReinit } from "../entity/PasswordReinit";
import config from "config";
// import { sendPasswordReinitMail } from "../utils/email";
import { generateRandomCode } from "../utils";

class AuthController {
  private static checkUserPassword = async (req: Request, res: Response) => (user: any, password: string) => {
    try {
      const compass = bcrypt.compareSync(password, user?.password);
      if (!compass) {
        return res.status(400).send("mot de passe incorrect");
      }
    } catch (error) {
      res
        .status(400)
        .send({
          status: "ERROR",
          code: "USER_FIND_ERROR",
          message: "Failed to fetch user",
        });
    }

  };

  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("tsy izy a!");
    }

    //Get user from database
    let user: any;
    try {

      user = await User.findOne({
        $or: [{ username: req.body?.username }, { email: req.body?.username }],
      });

      if (!(user)) {
        res.status(400).send("user error");

      }


      //Check if encrypted password match
      if (!AuthController.checkUserPassword(user, password)) {
        res.status(401).send({
          status: "ERROR",
          code: "PASSWORD_NOT_MATCH",
          message: "Password incorrect",
        });

        return;
      }

      // Sing JWT, valid for 1 hour
      const token = jwt.sign(
        { userId: user?._id, username: user?.username },
        config.get("jwtSecret"),
        { expiresIn: "4h" }
      );

      if (!token) {
        res
          .status(400)
          .send({
            status: "ERROR",
            code: "USER_FIND_ERROR",
            message: "Not authorization",
          });
      }
      // add some url

      const random: any = `${Math.random()}`;
      const words = random.split(".");
      const urlPlus = words[1]

      await User.updateOne(
        {
          _id: user?._id,
        },
        {
          $set: { urlPlus: urlPlus },
        }
      );

      //Send the jwt in the response
      res.status(200).json({
        lastName: user?.lastName,
        firstName: user?.firstName,
        email: user?.email,
        token,
        urlPlus,
      });

    } catch (error) {
      res
        .status(400)
        .send({
          status: "ERROR",
          code: "USER_FIND_ERROR",
          message: "Failed to fetch user",
        });
    }

    if (!user) {
      res.status(401).send({
        status: "ERROR",
        code: "USER_NOT_FOUND",
        message: "Failed to fetch user",
      });
      return;
    }

  };

  static forgotPassword = async (req: Request, res: Response) => {
    User.findOne({
      email: req.body.email,
    }).then(async (user: any) => {
      if (user) {
        try {
          const token = jwt.sign(
            { userId: user?._id },
            config.get("jwtSecret"),
            { expiresIn: "10m" }
          );
          const code = generateRandomCode();
          const reinit = PasswordReinit.create({
            email: user.email,
            user: user._id,
            hash: token,
            code,
            createdAt: new Date(),
          });
          (await reinit).save();
          // sendPasswordReinitMail(user.email, user.firstName, token, code);
          res.json({ status: "SUCCESS", message: "email sent" });
        } catch (err) {
          res.status(500).json({
            code: "FAILED_REINITIALIZATION",
            message: "Failed to reinit password",
          });
        }
      } else {
        return res.status(400).json({
          code: "EMAIL_DOESNOTEXIST_ERR",
          message: "Email not found",
        });
      }
    });
  };

  static changePassword = async (req: Request, res: Response) => {
    let token = <string>req.headers["authorization"];
    let user;
    if (token) {
      token = token.replace("Bearer ", "");

      let jwtPayload;

      //Try to validate the token and get data
      try {
        jwtPayload = <any>jwt.verify(token, config.get("jwtSecret"));
        res.locals.jwtPayload = jwtPayload;
      } catch (error) {
        //If token is not valid, respond with 423 (locked)
        res.status(423).send({
          status: "ERROR",
          code: "EXPIRED_TOKEN_ERROR",
          message: "Your token has expired",
        });
        return;
      }

      //The token is valid for 1 hour
      //We want to send a new token on every request
      const { userId } = jwtPayload;
      user = await User.findOne({
        _id: userId,
      });
    } else {
      const infoReinit = await PasswordReinit.findOne({
        code: req.body.code,
        email: req.body.email,
      });
      if (!infoReinit) {
        res.status(423).send({
          status: "ERROR",
          code: "CODE_ERROR",
          message: "Check your code please",
        });
      }
      user = await User.findOne({
        _id: infoReinit?.user,
      });
    }
    if (!user) {
      res.status(400).send({
        status: "ERROR",
        code: "USER_NOT_FOUND_ERROR",
        message: "User not found",
      });
    }
    try {
      const updatedInfo: any = {
        updatedBy: user?._id,
        updatedAt: Date.now(),
        password: bcrypt.hashSync(req.body.password, 8),
      };
      await User.updateOne({ _id: user?._id }, updatedInfo);
      const token = jwt.sign(
        { userId: user?._id, username: user?.username },
        config.get("jwtSecret"),
        { expiresIn: "4h" }
      );
      res.status(200).send({
        status: "SUCCESS",
        user,
        token
      });
    } catch (err) {
      res.status(500).send({
        status: "ERROR",
        code: "SERVER_ERROR",
        message: "Unable to update password",
      });
    }
  };

}

export default AuthController;
