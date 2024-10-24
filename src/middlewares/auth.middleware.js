import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/Users.model.js"
export const verifyJWT=asyncHandler(async (req,res,next)=>{
try {
        const token=req.cookies?.accessToken || 
        req.header("Authorization")?.replace("Bearer","");
        if(!token){

            throw new ApiError(401, "Unauthorized token")
        };
    
        const decodedInfo=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user=await User.findById(decodedInfo?._id).
        select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user=user;
        next();
} catch (error) {
    throw new ApiError(401,error.message)
}


})

//first get the token from cookies or request header 
//if token is not present throw an error
//verify the token using jwt.verify
//if verify then extract user_id from jwt
