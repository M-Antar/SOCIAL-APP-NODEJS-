import { AbstractRepository } from "../../abstractrepository";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export class UserRepository extends AbstractRepository<IUser> {
  constructor() {
    super(User);
  }

  async getAllUsers() {
    return await this.model.find();
  }
}
