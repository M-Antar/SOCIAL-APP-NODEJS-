import { config } from "dotenv"
config()
export const devConfig = {
PORT : process.env.PORT,
DB_URL : process.env.DB_URL,
API_KEY: process.env.API_KEY,
API_SECRET : process.env.API_SECRET,
CLOUD_NAME : process.env.CLOUD_NAME,
EMAIL:process.env.EMAIL,
PASS :process.env.PASS,
JWT_SECRET:process.env.JWT_SECRET
}