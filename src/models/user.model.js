
import mongoose ,{Schema, mongo} from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true

    }
},
{  timestamps:true}
)

userSchema.pre("save",async function (next) {
    if(this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPassewordMatch = async function(password){
    bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = async function(){
    jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username   
        }
    )
}
export const User = mongoose.model('User',userSchema)