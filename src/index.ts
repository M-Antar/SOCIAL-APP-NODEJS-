import { log } from "console"
import { config } from "dotenv"
config()
import express from "express"
import { bootstrap } from "./app.controller"
const app = express()
const port = 3000
bootstrap(app,express)
app.listen(port,()=>{
    log("app is running on port ", port)
})
