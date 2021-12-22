
import { Router } from 'express';
import PostController from '../controllers/post.controller';
const postRouter = Router();

const postCtrl = new PostController();

postRouter.get("/", postCtrl.get);
postRouter.get("/:id", postCtrl.getById);
postRouter.post("/", postCtrl.post);
postRouter.post("/:id", postCtrl.update);
postRouter.delete("/:id", postCtrl.delete);

export default postRouter;