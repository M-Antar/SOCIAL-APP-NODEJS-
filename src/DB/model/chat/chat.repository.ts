import { AbstractRepository } from "../../abstractrepository"
import { IChat } from "./chat.interface"
import { chat } from "./chat.model"

export class ChatRepository extends AbstractRepository <IChat>{
    constructor(){
        super(chat)
    }
}