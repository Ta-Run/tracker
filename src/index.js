import connectDB from "./dbconnection/index.js";
import { app } from "./app.js";
import dotenv from "dotenv"

const port = 8000
dotenv.config({
    path: './.env'
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running at port :${port}`)
    })
}).catch((error) => {
    console.log("MONGO db connection faild  !!!", error)
})