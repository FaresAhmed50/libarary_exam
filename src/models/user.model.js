import mongoose, {model, Schema} from "mongoose";



const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role : {
        type: String,
        required: true,
        enum: ["admin" , "member"],
    }
} , {timestamps: true});



const userModel = mongoose.models.User || model("User", UserSchema);
export default userModel;



