import { asyncHandler } from "../../utils/asyncHandler.js";
import {ApiError} from "../../utils/apiError.js"
import{User} from "../../models/Users.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js";
import {generateAccessTokenAndRefereshToken} from "../../utils/tokenGenrator.js"
const loginUser= asyncHandler(async(req,res)=>{

    let {email,username,password}= req.body;
    if(!email && !username){
        throw new ApiError(400,"please provied email and username");
    }
    let userExist=await User.findOne({
        $or:[{email},{username}]
    });
    if(!userExist){throw new ApiError(409,"User does not exitst")}

    let isPasswordValid=await userExist.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,"password is incorrect");
    }
    const {accessToken,refreshToken,userData}=await generateAccessTokenAndRefereshToken(userExist)
    const option={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(
        new ApiResponse(
            200,
            {
                accessToken,
                refreshToken,
                userData,
            },
            "login success"
        )
    )




})


export{loginUser}