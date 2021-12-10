import {Router} from 'express'
import postRouter from './post'
import commentRouter from './comment'
import userRouter from './user'

const router = Router()

router.use("/posts", postRouter)
router.use("/comments", commentRouter)
router.use("/users", userRouter)

export default router;