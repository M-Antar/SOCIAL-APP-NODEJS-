import { Router } from "express";
import { isAuth } from "../../middlewear/authintication/authintication.middlewear";
import chatService from "./chat.service";

const chatRouter =  Router()
chatRouter.get("/:userId",isAuth(),chatService.getChat)
export default chatRouter