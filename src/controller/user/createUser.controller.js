import{ asyncHandler } from "../../utils/asyncHandler.js"
import {ApiError} from "../../utils/apiError.js"
import {ApiResponse} from "../../utils/ApiResponse.js"
import { User } from "../../models/Users.model.js";
import{uploadeOnCloudinary} from "../../utils/cloudinary.js"
const registerUser=asyncHandler(async(req,res)=>{

    const {userName,fullName,email,password,phone} = req.body;
    console.log(req.body)
    if(
        [userName,fullName,email,password,phone].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required");
    }

    // check userName is unique 
    const userExist=await User.findOne({
        $or:[{userName},{email}]
    })
    if(userExist){
        throw new ApiError(409,"User already exist");
    }

    // uplode photo on cloudinary
    const avatarLocalpath= req.files?.avatar[0]?.path;
    const coverImageLocalpath=req.files?.coverImage[0]?.path;
    if(!avatarLocalpath){
        throw new ApiError(400,"Avatar file is required");
    }
    const avatar=await uploadeOnCloudinary(avatarLocalpath);
    const coverImage=await uploadeOnCloudinary(coverImageLocalpath);

    //User register in the database
    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        phone,
        userName:userName.toLowerCase(),
    })
    const createdUser= await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"Error creating user")
    }
    //send response
    return res.status(201).json(new ApiResponse(200,createdUser,"User register Succesfully"))

})




export {registerUser}