import { Router } from "express";
import { registerUser, loginUser, getAllUsers } from "../controller/users.controller.js";
// import { upload } from "../middlewares/multer.middlerware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const user = Router()

// user.route("/register").post(
//     upload.fields([
//         {
//             name: "avatar",
//             maxCount: 1
//         },

//     ]),
//     registerUser // Ensure registerUser is defined and exported correctly
// )

user.route("/register").post(

    registerUser // Ensure registerUser is defined and exported correctly
)

user.route("/login").post(

    loginUser  // Ensure registerUser is defined and exported correctly
)
user.route("/getusers").post(verifyJWT, getAllUsers); // Protected route

export default user