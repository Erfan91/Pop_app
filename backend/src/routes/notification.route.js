import { Router } from "express";
import { getNotifications, markAsRead } from "../controllers/notification.controller.js";
const router = Router();

router.route("/user-notifications/:id").get(getNotifications);
router.route("/user-notifications/:id/mark-as-read").patch(markAsRead);

export default router;