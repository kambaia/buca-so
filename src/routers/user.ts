

import  { Router} from 'express';
import authUsersController from '../controllers/authUsersController';
import userController from '../controllers/userController';
export const userRouter = Router();
userRouter.get('/api/users', userController.listAllUser);
userRouter.get('/api/user/:userId',  userController.listOneUser);
userRouter.get('/api/user-access/:userId',  userController.accessUser);
userRouter.post('/api/user', userController.saveUser);
userRouter.put('/api/user/:userId', userController.updateUser);
userRouter.delete('/api/user/:userId', userController.deleteUser);

/********************************authintication ************************ */

userRouter.post("/api/auth", authUsersController.authintication);
