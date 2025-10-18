import { Server as httpSServer } from "node:http"
import { Server, Socket } from "socket.io"
import { socketAuth } from "./middlewears"
import { sendMessage } from "./chat"


const connectedUsers = new Map<string,string>()

export const initSocket =(server : httpSServer)=> {
    const io = new Server(server , {cors :{origin:"*"}})
    io.use(socketAuth)
    io.on("conection",(socket:Socket)=>{
        connectedUsers.set(socket.data.user.id,socket.id)
        console.log(connectedUsers)
        console.log("new user connected")
         io.on("sendMessage",sendMessage(socket,io,connectedUsers)) //cb and (data)=>{} as front send 1 param
    })

   
}

