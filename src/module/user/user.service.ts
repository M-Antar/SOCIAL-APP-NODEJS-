import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../DB/model/user/user.repository";
import { PostFactoryService } from "../post/factory";

export class UserService {

  private  userRepository = new UserRepository();
  constructor() {}

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user?._id)
    let user = await this.userRepository.getOne({ _id: req.user?._id });
    return res
      .status(200)
      .json({ message: "done", success: true, data: { user } });
  };
}
