import { log } from "console"
import { config } from "dotenv"
config()
import express from "express"
import { bootstrap } from "./app.controller"
import { Server } from "socket.io"
import { initSocket } from "./socket.io"
const app = express()
const port = 3000
bootstrap(app,express)
const server = app.listen(port,()=>{
    log("app is running on port ", port)
})
initSocket(server)