import { Router } from "express";
import express from "express";
import UploadFileController from "../controllers/UploadFileController";

const routes = Router();

routes.post("/delete", UploadFileController.delete);
routes.post("/upload/:path", UploadFileController.upload);
routes.post("/multiple/:path", UploadFileController.multiple);
// routes.post("/multipleFilewithResize/:path", UploadFileController.multipleFilewithResize);
routes.use("/file", express.static("fichier"));
routes.use("/file/download", (req, res, next) => {
  res.type("application/octet-stream");
  res.set("Content-Disposition", "attachment");
  next();
}, express.static("fichier"));

export default routes;
