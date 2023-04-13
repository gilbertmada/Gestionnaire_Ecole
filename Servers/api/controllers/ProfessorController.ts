import { Request, Response, NextFunction } from "express";
import { Professor } from "../entity/Professor";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "config";
import { IProfessor } from "../entity/Professor";
import { getUserIdFromToken } from "../utils/user";

export default class ProfessorController {

  static newProfessor = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>res.getHeader("token");

    Professor.findOne({
      $or: [{ email: req.body?.email }],
    }).then(async (prof: any) => {
      if (prof) {
        return res.status(200).json({
          email: prof?.email == req.body?.email ? "Email already exists" : "",
        });
      } else {
        const newProfessor = new Professor({
          lastName: req.body?.lastName,
          firstName: req.body?.firstName,
          email: req.body?.email,
          IM: req.body?.IM,
          matiere: req.body?.matiere,
          password: bcrypt.hashSync(req.body.password, 8),
          photo: req.body?.photo,
          createdBy: getUserIdFromToken(token),
          role: req.body?.role,
          nomRole: req.body?.nomRole,
          deleted: false,
        });

        try {
          const professor = await newProfessor.save();
          
          res.send(professor);
        } catch (err) {
          console.log(err)
          res.status(500).send("Failed to save professor");
        }
      }
    });

  };


  static listProfessor = async (req: Request, res: Response) => {
    const professors = await Professor.find({ deleted: false, isArchive: false });

    const returnedProfessors = [];

    for (let i = 0; i < professors.length; i++) {
      returnedProfessors.push(professors[i].transform());
    }

    return res.status(200).send(returnedProfessors);
  };


  static editProfessor = async (req: Request, res: Response) => {
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
      const professor = await Professor.findOne({ _id });
      if (!professor) {
        res.status(404).send({
          status: 'ERROR',
          code: 'USER_NOT_FOUND',
          message: "Unable to find user to update"
        });
        return;
      }
      // if (info.password && !bcrypt.compareSync(info.password, user.password)) {
      //   res.status(403).send({
      //     status: 'ERROR',
      //     code: 'PASSWORD',
      //     message: "Your password is not correct"
      //   });
      //   return;
      // }

      const updatedInfo: any = {
        lastName: info.lastName,
        firstName: info.firstName,
        email: info.email,
        photo: info.photo,
        IM: info.IM,
        role: info.role,
        matiere: info.matiere,
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
      const resp = await Professor.updateOne({ _id }, updatedInfo);
      res.status(200).send(resp);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  };


  static deleteProfessor = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    const professorId = getUserIdFromToken(token);

    if (!professorId) {
      return res.status(500).send("Unable to delete user");
    }
    try {
      const professor = await Professor.deleteOne(
        {
          _id: req.body.id,
        },
     
      );
      return res.status(200).send("Professor deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete professor");
    }
  };

  static archive = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    const professorId = getUserIdFromToken(token);

    if (!professorId) {
      return res.status(500).send("Unable to delete user");
    }
    try {
      const professor = await Professor.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: { isArchive: true, deletedBy: professorId, deletedAt: new Date() },
        }
      );
      return res.status(200).send("Professor deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete professor");
    }
  };

  static deleteTotalProfessor = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    const professorId = getUserIdFromToken(token);

    if (!professorId) {
      return res.status(500).send("Unable to delete user");
    }
    try {
      const isTest = false;
      const professor = await Professor.deleteOne(
        {
          _id: req.body.id,
        },
      );

      return res.status(200).send("Professor deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete professor");
    }
  };

  static getFilteredProfessor = async (req: Request, res: Response) => {

    const { filter } = req.body;
    try {
      const professor: IProfessor[] | [] = await Professor.find({
        $and: [
          {
            $or: [
              { firstName: { $regex: filter.filter, $options: "i" } },
              { lastName: { $regex: filter.filter, $options: "i" } },
              { email: { $regex: filter.filter, $options: "i" } },
              { role: { $regex: filter.filter, $options: "i" } },
            ],
          },
          { deleted: false, isArchive: false },
        ],
      }).select("-password");


      const returnedProfessors = [];

      for (let i = 0; i < professor.length; i++) {
        returnedProfessors.push(professor[i].transform());
      }

      return res.status(200).send(returnedProfessors);
    } catch (err) {
      return res.send([]);
    }
  };

  static getFilteredUserArchive = async (req: Request, res: Response) => {

    const users = await Professor.find({ deleted: false, isArchive: true }).select("-password");

    const returnedUsers = [];

    for (let i = 0; i < users.length; i++) {
      returnedUsers.push(users[i].transform());
    }

    return res.status(200).send(returnedUsers);
  };

  static updateUrl = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");

    const random: any = `${Math.random()}`;
    const words = random.split(".");
    const urlPlus = words[1]


    // if (!userId) {
    //   return res.status(500).send("Unable to delete user");
    // }


    try {
      const professor = await Professor.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: { urlPlus: req.body.urlplus },
        }
      );

      return res.status(200).send({
        statut: "urlPlus success",
        urlplus: urlPlus
      });
    } catch (err) {
      res.status(500).send("Unable to give urlPlus");
    }
  };

}
