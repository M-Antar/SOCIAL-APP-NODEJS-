import { Router } from "express";
import { UserService } from "./user.service";

const userRouter = Router();
const userService = new UserService();

userRouter.get("/:id", userService.getProfile);

export default userRouter;
