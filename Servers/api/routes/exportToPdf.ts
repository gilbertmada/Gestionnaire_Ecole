import { Router } from "express";
import ExportPDfStudentController from "../controllers/ExportPdfStudentController";

const router = Router();

router.post("/list", ExportPDfStudentController.exportPdfList);
router.post("/recuDroit", ExportPDfStudentController.exportPdfRecuDroit);
router.post("/recuEcolage", ExportPDfStudentController.exportPdfRecuEcolage);
router.post("/recuFraisDivers", ExportPDfStudentController.exportPdfRecuFraisDivers);
router.post("/emploiDuTemps", ExportPDfStudentController.exportPdfEmploiDuTemps);

export default router;
