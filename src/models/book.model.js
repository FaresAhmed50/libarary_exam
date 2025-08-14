import mongoose, {model , Schema} from 'mongoose';



const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        min: 0,
        max: 2025
    },
    availableCopies : {
        type: Number,
        min: 0,
        default: 1
    },
} , {timestamps: true});



const bookModel = mongoose.models.Book || model("Book", bookSchema);
export default bookModel;