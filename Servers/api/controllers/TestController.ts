import { Request, Response } from "express";
import { Test } from "../entity/Test";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "config";
import { ITest } from "../entity/Test";
// import { getUserIdFromToken } from "../utils/user";

export default class TestController {

  static test = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");

    const newUser = new Test({
      lastName: req.body?.lastName,
      firstName: req.body?.firstName,
    });
    try {
      const user = await newUser.save();
      res.send(user);
    } catch (err) {
      console.log(err)
      res.status(500).send("Failed to save user");
    }
    // User.findOne({
    //   $or: [{ email: req.body?.email }, { username: req.body?.username }],
    // }).then(async (user: any) => {
    //   if (user) {
    //     return res.status(200).json({
    //       email: user?.email == req.body?.email ? "Email already exists" : "",
    //       username: user?.username == req.body?.username ? "Username already exists" : "",
    //     });
    //   } else {
    //     const newUser = new User({
    //       lastName: req.body?.lastName,
    //       firstName: req.body?.firstName,
    //       username: req.body?.username,
    //       email: req.body?.email,
    //       password: bcrypt.hashSync(req.body?.password, 8),
    //       photo: req.body?.photo,
    //       createdBy: getUserIdFromToken(token),
    //       role: req.body?.role,
    //       nomRole: req.body?.nomRole,
    //       deleted: false,
    //       categorie: req.body?.categorie
    //     });

    //     try {
    //       const user = await newUser.save();
    //       res.send(user);
    //     } catch (err) {
    //       console.log(err)
    //       res.status(500).send("Failed to save user");
    //     }
    //   }
    // });

  };


  static listAll = async (req: Request, res: Response) => {
    const users = await Test.find({ deleted: false});

    const returnedUsers = [];

    for (let i = 0; i < users.length; i++) {
      returnedUsers.push(users[i].transform());
    }

    return res.status(200).send(returnedUsers);
  };

//   static listAllAdmin = async (req: Request, res: Response) => {
//     const admins = await User.find({
//       $and: [
//         {
//           $or: [
//             { role: "ADMIN" },
//             { role: "DIR" },
//           ],
//         },
//         {
//           deleted: false,
//           isArchive: false
//         },
//       ],

//     })
//       .select("_id")
//       .select("firstName");
//     return res.status(200).send(admins);
//   };

//   static getOneById = async (req: Request, res: Response) => {
//     const id: string = req.params.id;
//     //Get the user from database
//     try {
//       const user = await User.findOne({ _id: id });
//       res.send(user);
//     } catch (error) {
//       res.status(404).send("User not found");
//     }
//   };

//   static editUser = async (req: Request, res: Response) => {
//     const { _id, ...info } = req.body;


//     const token = <string>res.getHeader("token");
//     if (req.body.newPassword && !req.body.password) {
//       res.status(400).send({
//         status: 'ERROR',
//         code: 'NO_CONFIRMATION_PASSWORD',
//         message: "Your should add a confirmation password"
//       });
//       return;
//     }

//     try {
//       const user = await User.findOne({ _id });
//       if (!user) {
//         res.status(404).send({
//           status: 'ERROR',
//           code: 'USER_NOT_FOUND',
//           message: "Unable to find user to update"
//         });
//         return;
//       }
//       if (info.password && !bcrypt.compareSync(info.password, user.password)) {
//         res.status(403).send({
//           status: 'ERROR',
//           code: 'PASSWORD',
//           message: "Your password is not correct"
//         });
//         return;
//       }
//       const updatedInfo: any = {
//         lastName: info.lastName,
//         firstName: info.firstName,
//         username: info.username,
//         email: info.email,
//         photo: info.photo,
//         updatedBy: getUserIdFromToken(token),
//         updatedAt: Date.now(),
//         isArchive: info.isArchive
//       };
//       if (info.newPassword) {
//         updatedInfo.password = bcrypt.hashSync(info.newPassword, 8);
//       }
//       if (info.role) {
//         updatedInfo.role = info.role;
//       }
//       const resp = await User.updateOne({ _id }, updatedInfo);

//       res.status(200).send(resp);
//     } catch (err) {
//       res.status(500).send({
//         status: 'ERROR',
//         code: 'INTERNAL_SERVER_ERROR',
//         message: "Unable to update user"
//       });
//     }
//   };


//   static deleteUser = async (req: Request, res: Response) => {
//     const token = <string>res.getHeader("token");
//     const userId = getUserIdFromToken(token);

//     if (!userId) {
//       return res.status(500).send("Unable to delete user");
//     }
//     try {
//       const user = await User.updateOne(
//         {
//           _id: req.body.id,
//         },
//         {
//           $set: { deleted: true, deletedBy: userId, deletedAt: new Date() },
//         }
//       );
//       return res.status(200).send("User deleted successfully");
//     } catch (err) {
//       res.status(500).send("Unable to delete user");
//     }
//   };

//   static archive = async (req: Request, res: Response) => {
//     const token = <string>res.getHeader("token");
//     const userId = getUserIdFromToken(token);

//     if (!userId) {
//       return res.status(500).send("Unable to delete user");
//     }
//     try {
//       const user = await User.updateOne(
//         {
//           _id: req.body.id,
//         },
//         {
//           $set: { isArchive: true, deletedBy: userId, deletedAt: new Date() },
//         }
//       );
//       return res.status(200).send("User deleted successfully");
//     } catch (err) {
//       res.status(500).send("Unable to delete user");
//     }
//   };

//   static deleteTotalUser = async (req: Request, res: Response) => {
//     const token = <string>res.getHeader("token");
//     const userId = getUserIdFromToken(token);

//     if (!userId) {
//       return res.status(500).send("Unable to delete user");
//     }
//     try {
//       const isTest = false;
//       const user = await User.deleteOne(
//         {
//           _id: req.body.id,
//         },
//       );



//       return res.status(200).send("User deleted successfully");
//     } catch (err) {
//       res.status(500).send("Unable to delete user");
//     }
//   };

  
  

 
}
