import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { admins, allUsers } from "../utils";

const router = Router();

//Get all users
router.get("/"  , [checkJwt, checkRole(allUsers)]  , UserController.listAll);

//Get all admin users 

router.get("/allAdmin", [checkJwt, checkRole(allUsers)], UserController.listAllAdmin);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(admins)],
  UserController.getOneById
);

// Get my info
router.get("/me", [checkJwt], UserController.getMe);


//Create a new user
// router.post("/", [checkJwt, checkRole(admins)], UserController.newUser);
router.post("/",UserController.newUser);

//Create a new user
router.post("/subscribe", UserController.subscribeUser);

//Edit one user
router.patch(
  // "/:id([0-9a-f]+)",
  "/edit",
  [checkJwt, checkRole(allUsers)],
  UserController.editUser
);

//update  user
router.patch(
  "/:id([0-9a-f]+)",
  // "/edit",
  [checkJwt, checkRole(allUsers)],
  UserController.updateUser
);

//Delete one user
router.patch(
  "/delete",
  [checkJwt, checkRole(admins)],
  UserController.deleteUser
);

//Delete one user
router.patch(
  "/archive",
  [checkJwt, checkRole(admins)],
  UserController.archive
);

//Delete one user
router.patch(
  "/deleteTotal",
  [checkJwt, checkRole(admins)],
  UserController.deleteTotalUser
);

// Get filtered User
router.post(
  "/filter",
  [checkJwt, checkRole(admins)],
  UserController.getFilteredUser
);

// Get filtered UserArchive
router.get(
  "/filterArchive",
  [checkJwt, checkRole(admins)],
  UserController.getFilteredUserArchive
);

//Edit one user
router.post(
  "/urlPlus",
  [checkJwt, checkRole(allUsers)],
  UserController.updateUrl
);
export default router;
