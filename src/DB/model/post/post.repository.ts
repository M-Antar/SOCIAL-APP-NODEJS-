import { AbstractRepository } from "../../abstractrepository"
import { IPost } from "./post.interface";
import { Post } from "./post.model";

export class postRepository extends AbstractRepository<IPost>{
constructor(){
    super(Post)
}
}