import { Router } from "express";
import {
    createAccount,
    loginUser,
    updateUser,
    deleteUser,
    usernameExists,
    emailExists,
    resetPassword,
    uploadImage,
    createUserProfile,
    getUserProfile
} from "../controllers/user.controller.js";

const router = Router();

router.route("/get-user/:id").get(getUserProfile);
router.route("/create-user").post(createAccount);
router.route("/login").post(loginUser);
router.route("/emailEx").post(emailExists);
router.route("/username").post(usernameExists);
router.route("/upload-image").post(uploadImage);
router.route("/create-profile").post(createUserProfile);
router.route("/reset-password").post(resetPassword);
router.route("/update-user/:id").patch(updateUser);
router.route("/delete-user/:id").delete(deleteUser);


export default router