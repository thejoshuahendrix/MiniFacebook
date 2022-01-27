import { Router } from 'express';

import UserController from '../controllers/user.controller';
const userRouter = Router();

const userCtrl = new UserController();

userRouter.post('/login', userCtrl.login);
userRouter.post('/register', userCtrl.register);

export default userRouter;
