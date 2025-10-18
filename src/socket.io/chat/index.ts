import { Server, Socket } from "socket.io"
import { MessageRepository } from "../../DB/model/message/message.repository"
import { ChatRepository } from "../../DB/model/chat/chat.repository"
import { ObjectId } from "mongoose"

interface iSendMessage{message:string,destId:string}

export const sendMessage = (socket:Socket,io:Server,connectedUsers:Map<String,string>)=>{
    return async (data:iSendMessage)=>{
        const destSockset = connectedUsers.get(data.destId)
        io.send("successMessage",data)
        io.to(destSockset as string).emit("receiveMessage")

        
         const messageRepository = new MessageRepository ()
         const sender = socket.data.user.id

        const createdMessage = await messageRepository.createItem({content:data.message,sender:sender})

        const chatRepository = new ChatRepository()

        const chat = await chatRepository.getOne({users:{$all:[sender,data.destId]}})

        if(!chat){
            await chatRepository.createItem({users:[sender,data.destId],messages:[createdMessage._id as unknown as ObjectId]})
        }else{
            await chatRepository.update({_id:chat._id},{$push:{messages:createdMessage._id}})
        }

}
}
