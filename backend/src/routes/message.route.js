import { Router } from "express";
import { getConversation, getInbox } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/inbox", verifyToken, getInbox);
router.get("/:id", verifyToken, getConversation);

export default router;