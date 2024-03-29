import { Router } from "express";
import { registerUser } from "../controller/users.controller.js";
import { upload } from "../middlewares/multer.middlerware.js";

const user = Router()

user.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },

    ]),
    registerUser // Ensure registerUser is defined and exported correctly
)



export default user