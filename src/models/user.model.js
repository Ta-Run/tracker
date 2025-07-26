import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String }
}, { timestamps: true });

// ✅ Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();  // <-- fix condition
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ✅ Match password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Generate JWT
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        "secretKeysare121", // make sure to set in .env
        {
            expiresIn: '7d'
        }
    );
};

export const User = mongoose.model('User', userSchema);
