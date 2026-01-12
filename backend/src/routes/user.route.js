import { Router } from "express";
import { createAccount, loginUser, updateUser, deleteUser, usernameExists} from "../controllers/user.controller.js";
const router = Router();

router.route("/create-user").post(createAccount);
router.route("/login").post(loginUser);
router.route("/username").post(usernameExists);
router.route("/update-user/:id").patch(updateUser);
router.route("/delete-user/:id").delete(deleteUser);

export default router