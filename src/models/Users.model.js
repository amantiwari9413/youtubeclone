import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = Schema({
  userName: { require: true, type: String, unique:true,trim:true,index:true},
  fullName: { require: true, type: String, trim:true,index:true},
  email: { require: true, type: String, unique:true,trim:true},
  password: { require: true, type: String },
  phone: { require: true, type: String,maxLength:[50] },
  avatar: { require: true, type: String },
  coverImage: {type: String },
  refreshToken:{type:String},
  watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
  ],
},
{
    timestamps: true,
}
);


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})
 
userSchema.methods.isPasswordCorrect= async ()=>{
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateAccessToken=function(){
  return jwt.sign({
    _id:this._id,
    userName:this.userName,
    email:this.email,
    fullName:this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
)
}

userSchema.methods.generateRefreshToken=function(){
  return jwt.sign({
    _id:this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  }
)
}

export const User= mongoose.model('User',userSchema);
