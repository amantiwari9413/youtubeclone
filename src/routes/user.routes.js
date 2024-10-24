import {Router} from "express"
import {registerUser} from "../controller/user/createUser.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { loginUser } from "../controller/user/loginUser.controller.js";
import { logoutUser } from "../controller/user/logoutUser.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router= Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT,logoutUser)

export default router