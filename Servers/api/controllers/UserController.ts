import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "config";
import { IUser } from "../entity/User";
import { getUserIdFromToken } from "../utils/user";

export default class UserController {

  static getMe = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    let jwtPayload;
    try {
      jwtPayload = <any>jwt.verify(token, config.get("jwtSecret"));
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      return res.status(400).send("there is something weird with your token");
    }

    const { userId } = jwtPayload;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("user not found");
    }

    return res.json(user);
  };



  static newUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>res.getHeader("token");

    User.findOne({
      $or: [{ email: req.body?.email }, { username: req.body?.username }],
    }).then(async (user: any) => {
      if (user) {
        return res.status(200).json({
          email: user?.email == req.body?.email ? "Email already exists" : "",
          username: user?.username == req.body?.username ? "Username already exists" : "",
        });
      } else {
        const newUser = new User({
          lastName: req.body?.lastName,
          firstName: req.body?.firstName,
          username: req.body?.username,
          email: req.body?.email,
          password: bcrypt.hashSync(req.body.password, 8),
          photo: req.body?.photo,
          createdBy: getUserIdFromToken(token),
          role: req.body?.role,
          nomRole: req.body?.nomRole,
          deleted: false,
          categorie: req.body?.categorie
        });

        try {
          const user = await newUser.save();
          res.send(user);
        } catch (err) {
          console.log(err)
          res.status(500).send("Failed to save user");
        }
      }
    });

  };

  static subscribeUser = async (req: Request, res: Response) => {
    User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    }).then(async (user: any) => {
      if (user) {
        return res.status(400).json({
          code: 'EMAIL_EXIST_ERR',
          email: user.email == req.body.email ? "Email already exists" : "",
          username:
            user.username == req.body.username ? "Username already exists" : "",
        });
      } else {
        const newUser = new User({
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          photo: req.body.photo,
          createdBy: "123456789012",
          role: 'DIR',
          deleted: false,
        });

        try {
          const user = await newUser.save();
          //Sing JWT, valid for 1 hour
          const token = jwt.sign(
            { userId: user?._id, username: user?.username },
            config.get("jwtSecret"),
            { expiresIn: "4h" }
          );
          res.send({
            status: 'SUCCESS',
            user,
            token
          });
        } catch (err) {
          res.status(500).json({
            code: "SAVE_ERR",
            message: "Failed to save user"
          });
        }
      }
    });
  };

  static listAll = async (req: Request, res: Response) => {
    const users = await User.find({ deleted: false});

    const returnedUsers = [];

    for (let i = 0; i < users.length; i++) {
      returnedUsers.push(users[i].transform());
    }

    return res.status(200).send(returnedUsers);
  };

  static listAllAdmin = async (req: Request, res: Response) => {
    const admins = await User.find({
      $and: [
        {
          $or: [
            { role: "ADMIN" },
            { role: "DIR" },
            { role: "PROV" },
            { role: "SURV" },
          ],
        },
        {
          deleted: false,
        },
      ],

    })
      .select("_id")
      .select("firstName");
    return res.status(200).send(admins);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    //Get the user from database
    try {
      const user = await User.findOne({ _id: id });
      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static editUser = async (req: Request, res: Response) => {
    const { _id, ...info } = req.body;


    const token = <string>res.getHeader("token");
    if (req.body.newPassword && !req.body.password) {
      res.status(400).send({
        status: 'ERROR',
        code: 'NO_CONFIRMATION_PASSWORD',
        message: "Your should add a confirmation password"
      });
      return;
    }

    try {
      const user = await User.findOne({ _id });
      if (!user) {
        res.status(404).send({
          status: 'ERROR',
          code: 'USER_NOT_FOUND',
          message: "Unable to find user to update"
        });
        return;
      }

      const updatedInfo: any = {
        lastName: info.lastName,
        firstName: info.firstName,
        username: info.username,
        email: info.email,
        photo: info.photo,
        updatedBy: getUserIdFromToken(token),
        updatedAt: Date.now(),
        isArchive: info.isArchive
      };
      if (info.newPassword) {
        updatedInfo.password = bcrypt.hashSync(info.newPassword, 8);
      }
      if (info.role) {
        updatedInfo.role = info.role;
      }
      const resp = await User.updateOne({ _id }, updatedInfo);
      res.status(200).send(resp);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  };


  static deleteUser = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(500).send("Unable to delete user");
    }
    try {
      const user = await User.deleteOne(
        {
          _id: req.body.id,
        },
        // {
        //   $set: { deleted: true, deletedBy: userId, deletedAt: new Date() },
        // }
      );
      return res.status(200).send("User deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete user");
    }
  };

  static archive = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(500).send("Unable to delete user");
    }
    try {
      const user = await User.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: { isArchive: true, deletedBy: userId, deletedAt: new Date() },
        }
      );
      return res.status(200).send("User deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete user");
    }
  };

  static deleteTotalUser = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(500).send("Unable to delete user");
    }
    try {
      const isTest = false;
      const user = await User.deleteOne(
        {
          _id: req.body.id,
        },
      );



      return res.status(200).send("User deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete user");
    }
  };

  static getFilteredUser = async (req: Request, res: Response) => {

    const { filter } = req.body;
    try {
      const user: IUser[] | [] = await User.find({
        $and: [
          {
            $or: [
              { firstName: { $regex: filter.filter, $options: "i" } },
              { lastName: { $regex: filter.filter, $options: "i" } },
              { email: { $regex: filter.filter, $options: "i" } },
              { username: { $regex: filter.filter, $options: "i" } },
              { role: { $regex: filter.filter, $options: "i" } },
            ],
          },
          { deleted: false, isArchive: false },
        ],
      }).select("-password");


      const returnedUsers = [];

      for (let i = 0; i < user.length; i++) {
        returnedUsers.push(user[i].transform());
      }

      return res.status(200).send(returnedUsers);
    } catch (err) {
      return res.send([]);
    }
  };

  static getFilteredUserArchive = async (req: Request, res: Response) => {

    const users = await User.find({ deleted: false, isArchive: true }).select("-password");

    const returnedUsers = [];

    for (let i = 0; i < users.length; i++) {
      returnedUsers.push(users[i].transform());
    }

    return res.status(200).send(returnedUsers);
  };


  static updateUser = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    
    if (req.body.newPassword && !req.body.password) {
      res.status(400).send({
        status: 'ERROR',
        code: 'NO_CONFIRMATION_PASSWORD',
        message: "Your should add a confirmation password"
      });
      return;
    }
    try {
      const user = await User.findOne({ _id: req.body._id || req.body.id });
      
      if (!user) {
        res.status(404).send({
          status: 'ERROR',
          code: 'USER_NOT_FOUND',
          message: "Unable to find user to update"
        });
        return;
      }
      if (req.body.password && !bcrypt.compareSync(req.body.password, user.password)) {
        res.status(403).send({
          status: 'ERROR',
          code: 'PASSWORD',
          message: "Your password is not correct"
        });
        return;
      }

      const updated = await User.updateOne(
        { _id: req.body._id  },
        {
          $set: {
            ...req.body,
            updatedBy: getUserIdFromToken(token),
            updatedAt: Date.now(),
            password: req.body.newPassword ? bcrypt.hashSync(req.body.newPassword, 8) :""
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).send(updated);
    } catch (err) {
      return res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  };

  static updateUrl = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const userId = getUserIdFromToken(token);

    const random: any = `${Math.random()}`;
    const words = random.split(".");
    const urlPlus = words[1]


    // if (!userId) {
    //   return res.status(500).send("Unable to delete user");
    // }


    try {
      const user = await User.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: { urlPlus: req.body.urlplus },
        }
      );

      return res.status(200).send({
        status: "urlPlus success",
        urlplus: urlPlus
      });
    } catch (err) {
      res.status(500).send("Unable to give urlPlus");
    }
  };

}
