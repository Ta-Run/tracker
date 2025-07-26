import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Authorization header missing or malformed");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "secretKeysare121");
        req.user = await User.findById(decoded._id).select("-password");
        if (!req.user) {
            throw new ApiError(404, "User not found");
        }
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
});
