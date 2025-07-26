import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { emailVarification } from "../utils/emailVarification.js";
import bcrypt from 'bcrypt'

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    console.log(req.file)
    const hashPassword = await bcrypt.hash(password, 10)

    if (
        [email, username, hashPassword].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        email
    })

    if (existedUser) {
        throw new ApiError(409, "User with email already exists")
    }

    // const avatarLocalPath = req.files?.avatar[0]?.path;

    // if (!avatarLocalPath) {
    //     throw new ApiError(400, "Avatar file is required")
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)

    // if (!avatar) {
    //     throw new ApiError(400, "Avatar file is required")
    // }

    const user = await User.create({
        // avatar: avatar.url,
        email,
        password: hashPassword,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password "
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    if (createdUser) {
        emailVarification(username, email, user._id)
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isMatch = await user.isPasswordMatch(password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = user.generateAccessToken();

    return res.status(200).json(
        new ApiResponse(200, { token, user: { id: user._id, email: user.email, username: user.username } }, "Login successful")
    );
});
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
        throw new ApiError(404, "No users found");
    }

    return res.status(200).json(
        new ApiResponse(200, users, "Fetched all users successfully")
    );
});




export { registerUser, loginUser, getAllUsers }