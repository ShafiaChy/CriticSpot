import { Router } from "express";
import { UserControllers } from "./user.controller";



const router = Router();
router.post('/create-user', UserControllers.createUser)
router.get('/get-user',
    UserControllers.getAllUser)
router.get('/get-user/:userId',
    UserControllers.getSingleUser)
router.put(
    '/update-user/:userId',
    UserControllers.updateUser,
);

router.delete(
    '/delete-user/:userId',
  
    UserControllers.deleteUser,
);

export const userRouter = router;