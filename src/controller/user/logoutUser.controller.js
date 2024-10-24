import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/Users.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
const logoutUser=asyncHandler(async (req,res,next)=>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined 
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,{},"User logged Out"))
})


export {logoutUser}