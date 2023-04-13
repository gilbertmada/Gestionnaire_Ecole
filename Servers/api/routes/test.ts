import { Router } from "express";
import TestController from "../controllers/TestController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { admins, allUsers } from "../utils";

const router = Router();

//Get all users
router.get("/", TestController.listAll);

//Get all admin users 

// router.get("/allAdmin", [checkJwt, checkRole(allUsers)], UserController.listAllAdmin);


//Create a new user
// router.post("/", [checkJwt, checkRole(admins)], UserController.newUser);
router.post("/",TestController.test);

// //Create a new user
// router.post("/subscribe", UserController.subscribeUser);

// //Edit one user
// router.patch(
//   // "/:id([0-9a-f]+)",
//   "/edit",
//   [checkJwt, checkRole(allUsers)],
//   UserController.editUser
// );

// //Delete one user
// router.patch(
//   "/delete",
//   [checkJwt, checkRole(admins)],
//   UserController.deleteUser
// );

// //Delete one user
// router.patch(
//   "/archive",
//   [checkJwt, checkRole(admins)],
//   UserController.archive
// );


export default router;
