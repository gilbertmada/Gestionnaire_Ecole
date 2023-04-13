import { Request, Response } from "express";
import { async } from "rxjs";
import { Student, IStudent } from "../entity/Student";
import { EcolagePrive } from "../entity/Student/ecolagePrive";
import { FraisDivers } from "../entity/Student/fraisDivers";
import * as bcrypt from "bcryptjs";
import { getUserIdFromToken } from "../utils/user";
import moment from "moment";

export default class studentControleur {
  //new student
  static createStudent = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    Student.findOne({
      $and: [{ matriculNumber: req.body.matriculNumber }, { class: req.body.class }],
    }).then(async (student: any) => {
      if (student) {
        return res.status(200).json({
          matriculNumber: student.matriculNumber == req.body.matriculNumber && student.class == req.body.class ? "MatriculNumber already exists" : "",
        });
      } else {
        const newStudent = new Student({
          schoolName: req.body.schoolName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          class: req.body.class,
          height: req.body.height,
          matriculNumber: req.body.matriculNumber,
          address: req.body.address,
          photo: req.body.photo,
          inscriptionDroit: req.body?.inscriptionDroit,
          createdBy: getUserIdFromToken(token),
          deleted: false,
        });


        try {
          const student = await newStudent.save();
          res.send(student);

        } catch (err) {
          res.status(500).send("Failed to save student");
        }
      }
    });
  };

  static createEcolagePrive = async (req: Request, res: Response) => {

    const ecolage = req.body;

    const newEcolage = new EcolagePrive({
      student: ecolage.student,
      matriculNumber: ecolage.matriculNumber,
      ecolage: ecolage.ecolage,
      datePayEcolage: ecolage.datePayEcolage,
      ecolageMonth: ecolage.ecolageMonth
    });
    try {
      const ecolagePrive = await newEcolage.save();
      res.send(ecolagePrive);
    } catch (error) {
      res.status(500).send("Failed to save Ecolage prive");
    }

  };

  static createFraisDivers = async (req: Request, res: Response) => {

    const fraisDivers = req.body;

    const newFrais = new FraisDivers({
      student: fraisDivers.student,
      matriculNumber: fraisDivers.matriculNumber,
      frais: fraisDivers.frais,
      datePayDivers: fraisDivers.datePayDivers,
    });
    try {
      const frais = await newFrais.save();

      res.send(frais);
    } catch (error) {
      res.status(500).send("Failed to save Frais Divers");
    }
  };

  static updateStudent = async (req: Request, res: Response) => {
    const { _id, ...info } = req.body;

    const token = <string>res.getHeader("token");
    if (req.body.matriculNumber !== info.matriculNumber  && req.body.class !== info.class  ) {
      res.status(400).send({
        status: 'ERROR',
        code: 'MATRICULE_ERROR',
        message: "You should add a matricule exact"
      });
      return;
    }

    try {
      const student = await Student.findOne({ _id });
      if (!student) {
        res.status(404).send({
          status: 'ERROR',
          code: 'STUDENT_NOT_FOUND',
          message: "Unable to find student to update"
        });
        return;
      }

      const updatedInfo: any = {
        schoolName: info.schoolName,
        lastName: info.lastName,
        firstName: info.firstName,
        photo: info.photo,
        height: info.height,
        address: info.address,
        inscriptionDroit: info.inscriptionDroit,
        updatedBy: getUserIdFromToken(token),
        updatedAt: Date.now(),
      };

      const resp = await Student.updateOne({ _id }, updatedInfo);
      res.status(200).send(resp);
    } catch (err) {
      res.status(500).send({
        status: 'ERROR',
        code: 'INTERNAL_SERVER_ERROR',
        message: "Unable to update user"
      });
    }
  };

  static getListStudent = async (req: Request, res: Response) => {

    try {
      const students = await Student.find({ deleted: false });

      let returnedUsers = [];

      for (let i = 0; i < students.length; i++) {
        returnedUsers.push(students[i].transform());
      }

      return res.status(200).send(returnedUsers);

    } catch (err) {
      res.status(500).send("Unable to update student");
    }
  }

  static getListEcolage = async (req: Request, res: Response) => {

    try {
      const ecolages = await EcolagePrive.find();

      let returnedEcolages = [];

      for (let i = 0; i < ecolages.length; i++) {
        returnedEcolages.push(ecolages[i].transform());
      }

      return res.status(200).send(returnedEcolages);

    } catch (err) {
      res.status(500).send("Unable to update Ecolage");
    }
  }

  static getListFraisDivers = async (req: Request, res: Response) => {

    try {
      const fraisDivers = await FraisDivers.find();

      let returnedFrais = [];

      for (let i = 0; i < fraisDivers.length; i++) {
        returnedFrais.push(fraisDivers[i].transform());
      }

      return res.status(200).send(returnedFrais);

    } catch (err) {
      res.status(500).send("Unable to update Frais");
    }
  }
  // static deleteStudent = async (req: Request, res: Response) => {

  //   const token = <string>res.getHeader("token");
  //   const studentId = getUserIdFromToken(token);

  //   if (!studentId) {
  //     return res.status(500).send("Unable to delete student");
  //   }
  //   try {
  //     const student = await Student.updateOne(
  //       {
  //         _id: req.body.id,
  //       },
  //       {
  //         $set: { deleted: true, deletedBy: studentId, deletedAt: new Date() },
  //       }
  //     );
  //     return res.status(200).send("Student deleted successfully");
  //   } catch (err) {
  //     res.status(500).send("Unable to delete student");
  //   }

  // }


  static getFilteredStudent = async (req: Request, res: Response) => {

    const { filter } = req.body;
    try {
      const student: IStudent[] | [] = await Student
        .find({
          $and: [
            {
              $or: [
                { firstName: { $regex: filter.filter, $options: "i" } },
                { lastName: { $regex: filter.filter, $options: "i" } },
                { height: { $regex: filter.filter, $options: "i" } },
                { class: { $regex: filter.filter, $options: "i" } },
                { matriculNumber: { $regex: filter.filter, $options: "i" } },
              ],
            },
          ],
        });

      let returnedUsers = [];

      for (let i = 0; i < student.length; i++) {
        returnedUsers.push(student[i].transform());
      }

      return res.status(200).send(returnedUsers);
    } catch (err) {
      return res.send([]);
    }
  };

  static deleteTotalStudent = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const studentId = getUserIdFromToken(token);

    if (!studentId) {
      return res.status(500).send("Unable to delete student");
    }
    try {
      await Student.deleteOne(
        {
          _id: req.body.id,
        },
      );

      return res.status(200).send("Student deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete student");
    }

  }

  static deleteTotalEcolage = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const studentId = getUserIdFromToken(token);

    if (!studentId) {
      return res.status(500).send("Unable to delete student");
    }
    try {

      await EcolagePrive.deleteOne(
        {
          _id: req.body.id,
        },
      );


      return res.status(200).send("Student deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete student");
    }

  }

  static deleteTotalFraisDivers = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const studentId = getUserIdFromToken(token);

    if (!studentId) {
      return res.status(500).send("Unable to delete student");
    }
    try {
      const deleteFra = await FraisDivers.deleteOne(
        {
          _id: req.body.id,
        },
      );

      return res.status(200).send("Student deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete student");
    }

  }

}