import mongoose, {model, Schema} from 'mongoose'


const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    bookID : {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
        index: true
    },
    borrowDate : {
        type: Date,
        default: Date.now
    },
    returnDate : {
        type: Date,
    },
    status : {
        type: String,
        required: true,
        enum: ['borrowed', 'returned'],
    }
} , {timestamps: true});



const transactionModel = mongoose.models.transactionModel || model("transactionModel" , transactionSchema);
export default transactionModel;


























