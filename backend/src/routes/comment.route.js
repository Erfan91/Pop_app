import { Router } from 'express';
const router = Router();
import { createComment, getComment, editComment, deleteComment} from '../controllers/comment.controller.js';

router.route("/add-comment").post(createComment);
router.route("/comments/:id").get(getComment);
router.route("/edit-comment/:id").patch(editComment);
router.route("/delete-comment/:id").delete(deleteComment);

export default router;