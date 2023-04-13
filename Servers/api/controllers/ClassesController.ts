import { Request, Response } from "express";
import { Classe, IClasse } from "../entity/Classes";
import { getUserIdFromToken } from "../utils/user";
import { IProfessor, Professor } from "../entity/Professor";
export default class classesController {
  static createClasses = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const classe: IClasse | any = req.body;

    const professor: IProfessor | any = await Professor.findById({ _id: classe.prof._id });
    const newClasse = new Classe({
      className: classe.className,
      schoolName: classe.schoolName,
      day: classe.dataDay.day,
      nomDay: classe.dataDay.nomDay,
      horror: classe.dataHorror.horror,
      nomHorror: classe.dataHorror.nomHorror,
      prof: professor,
      createdBy: getUserIdFromToken(token),
      deleted: false,
    });


    try {

      const saveClasse = await newClasse.save();

      res.send(saveClasse);
    } catch (error) {
      res.status(500).send("Failed to save Classe");
    }
  };


  static listClasses = async (req: Request, res: Response) => {
    const classes = await Classe.find({ deleted: false });

    const returnedClasses = [];
    for (let i = 0; i < classes.length; i++) {
      returnedClasses.push(classes[i].transform());
    }

    return res.status(200).send(returnedClasses);
  };

  static getFilteredClasse = async (req: Request, res: Response) => {

    const { filter } = req.body;
    try {
      const classFilter: IClasse[] | [] = await Classe.find({
        $and: [
          {
            $or: [
              { "prof.firstName": { $regex: filter.filter, $options: "i" } },
              { "prof.lastName": { $regex: filter.filter, $options: "i" } },
              { className: { $regex: filter.filter, $options: "i" } },
            ],
          },
        ],
      });

      const returnedClasses = [];

      for (let i = 0; i < classFilter.length; i++) {
        returnedClasses.push(classFilter[i].transform());
      }

      return res.status(200).send(returnedClasses);
    } catch (err) {
      return res.send([]);
    }
  };

  static deleteTotalClasses = async (req: Request, res: Response) => {

    const token = <string>res.getHeader("token");
    const classseId = getUserIdFromToken(token);

    if (!classseId) {
      return res.status(500).send("Unable to delete classe");
    }
    try {
      await Classe.deleteOne(
        {
          _id: req.body.id,
        },
      );

      return res.status(200).send("Classe deleted successfully");
    } catch (err) {
      res.status(500).send("Unable to delete classe");
    }

  }
}