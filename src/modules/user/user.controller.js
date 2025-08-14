import Router from "express";
import {validate} from "../../middlewares/validateSchema.middleware.js";
import {loginSchema, registerSchema} from "../../utils/validationSchema.js";
import userService from "./user.service.js";
import authenticate from "../../middlewares/auth.middleware.js"




const userRouter =  Router();


userRouter.route('/register' ).post(validate(registerSchema) , userService.register);
userRouter.route("/login").post(validate(loginSchema) , userService.login)
userRouter.route("/profile").get(authenticate , userService.getProfile )










export default userRouter;