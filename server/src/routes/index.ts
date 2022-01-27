import { Router } from 'express';

import commentRouter from './comment';
import postRouter from './post';
import userRouter from './user';

const router = Router();

router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/users', userRouter);

export default router;
