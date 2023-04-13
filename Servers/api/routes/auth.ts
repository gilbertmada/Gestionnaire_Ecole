import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/login", AuthController.login);

//Forgot password
router.post("/forgotPassword", AuthController.forgotPassword);

//Change password
router.post("/changePassword", AuthController.changePassword);

export default router;
