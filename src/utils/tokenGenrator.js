import { ApiError } from "./apiError.js";
const generateAccessTokenAndRefereshToken=async function (user) {
    try {
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;
        user.save({validateBeforSave:false})
        const userData={
            user_id:user._id,
            userName:user.userName,
            email:user.email
        }
        return {accessToken,refreshToken,userData};
        
    } catch (error) {
        throw new ApiError(400,error.message)
    }

}

export {generateAccessTokenAndRefereshToken}
