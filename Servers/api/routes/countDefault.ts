import { Router } from "express";
import DefaultController from "../controllers/DefaultController";


const router = Router();

router.get("/", DefaultController.getAllCount);

export default router;