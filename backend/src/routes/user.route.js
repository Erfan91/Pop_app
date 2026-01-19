import { Router } from "express";
import { createAccount, loginUser, updateUser, deleteUser, usernameExists, emailExists, resetPassword} from "../controllers/user.controller.js";
const router = Router();

router.route("/create-user").post(createAccount);
router.route("/login").post(loginUser);
router.route("/emailEx").post(emailExists);
router.route("/username").post(usernameExists);
router.route("/reset-password").post(resetPassword);
router.route("/update-user/:id").patch(updateUser);
router.route("/delete-user/:id").delete(deleteUser);

export default router