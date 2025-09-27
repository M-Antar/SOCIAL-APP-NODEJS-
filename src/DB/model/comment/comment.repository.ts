import { AbstractRepository } from "../../abstractrepository";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

export class CommentRepository extends AbstractRepository<IComment>{
    constructor(){
        super(Comment)
    }
}