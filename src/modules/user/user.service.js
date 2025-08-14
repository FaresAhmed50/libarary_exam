import mongoose from "mongoose";
import userModel from "../../models/user.model.js";
import responseError from "../../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {signJWT} from "../../utils/jwt.js";
import successHandler from "../../utils/succsessHandler.js";


const userService= {


    register: async (req, res) => {
        const { name, email, password, role } = req.body;
        const user = await userModel.findOne({email: email});
        if (user) throw new responseError(409, "A user already exists with given email");
        const hashedPassword = await bcrypt.hash(password, 8);
        await userModel.create({name, email, password : hashedPassword, role});
        return res.status(201).json({message: "Successfully registered user"} , user);
    },


    login: async (req, res) => {
        const {email, loginPassword} = req.body;
        const user = await userModel.findOne({email: email});
        if (!user) throw new responseError(404, "user not found");
        const { _id, name, password, role } = user
        const isValidPassword = await bcrypt.compare(loginPassword, password)
        if (!isValidPassword) {
            throw new responseError(404, "Invalid credentials");
        }
        const {accessToken, refreshToken} = signJWT(_id, name , role);
        return successHandler(res , {accessToken, refreshToken , _id, name, role});
    },


    getProfile : async (req, res) => {
        const id = req.userId;
        const user = await userModel.findById(id);
        if (!user) throw new responseError(404, "user not found");
        return successHandler(res , {user});
    }

}

export default userService;









