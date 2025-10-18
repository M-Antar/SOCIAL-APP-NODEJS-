import { Router } from "express";
import { UserService } from "./user.service";
import { isAuth } from "../../middlewear/authintication/authintication.middlewear";

const userRouter = Router();
const userService = new UserService();

userRouter.get("/profile",isAuth(),userService.getProfile);

export default userRouter;
