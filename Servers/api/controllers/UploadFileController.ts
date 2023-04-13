import { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const createMulterStorage = (filePath: string) => {
  return multer.diskStorage({
    destination: `./fichier/${filePath}`,
    filename: function (req, file, cb) {
      const name = file.originalname;
      const splitName = name.split("-");
      cb(
        null,
        splitName[0] +
        "-" +
        splitName[1]?.split(".")[0] +
        new Date().getTime() +
        path.extname(file.originalname)
      );
    },
  });
}

export default class uploadFileController {
  // delete file uploaded

  static delete = async (req: Request, res: Response) => {

    const path = req.body.path;

    try {
      fs.unlinkSync(path);
      res.status(200).send("success");
      //file removed
    } catch (err) {
      res.status(400).send("Failed to delete file");
    }
  };

  static upload = async (req: Request, res: Response) => {
    try {
      const storage = createMulterStorage(req.params.path);
      
      const uploadStorage = multer({ storage: storage });

      uploadStorage.single("file")(req, res, () => {
        return res.status(200).send(req.file);
      });

    } catch (err) {
      console.log(err);
      res.status(400).send("Failed to delete file");
    }
  };

  static multiple = async (req: Request, res: Response) => {
    try {
      const storage = createMulterStorage(req.params.path);
      const uploadStorage = multer({ storage: storage });

      uploadStorage.array("files", 15)(req, res, (err) => {
        if (err) throw err;
        return res.status(200).send(req.files);
      });
    } catch (err) {
      console.log('error trying to upload multiple', err);
      res.status(400).send("Failed to delete file");
    }
  };

  
}
