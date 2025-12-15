import { Router } from "express";
import { createAccount } from "../controllers/user.controller.js";
const router = Router();

router.route("/create-user").post(createAccount);

export default router