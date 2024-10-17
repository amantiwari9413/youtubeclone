import{ asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/Users.model.js";
import{uploadeOnCloudinary} from "../utils/cloudinary.js"
const registerUser=asyncHandler(async(req,res)=>{
    function removeCircular(obj) {
        const seen = new Map();
      
        const recurse = obj => {
          seen.set(obj, true);
      
          Object.entries(obj).forEach(([k, v]) => {
            if (typeof v !== 'object') return;
            if (seen.has(v)) delete obj[k];
            else recurse(v);
          });
        };
      
        recurse(obj);
      }

    const {userName,fullName,email,password,phone} = req.body;

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
    console.log(createdUser)
    if(!createdUser){
        throw new ApiError(500,"Error creating user")
    }
    //send response
    console.log(createdUser)
    return res.status(201).json(new ApiResponse(200,createdUser,"User register Succesfully"))

})

export {registerUser}