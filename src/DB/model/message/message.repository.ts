import { AbstractRepository } from "../../abstractrepository"
import { IMessage } from "./message.interface"
import { message } from "./message.model"

export class MessageRepository extends AbstractRepository <IMessage>{
    constructor(){
        super(message)
    }
}