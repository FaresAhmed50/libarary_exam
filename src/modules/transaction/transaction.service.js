import bookModel from "../../models/book.model.js";
import responseError from "../../utils/errorHandler.js";
import transactionModel from "../../models/transaction.model.js";
import successHandler from "../../utils/succsessHandler.js";


const transactionService = {


    borrowBook : async (req, res) => {
        const { bookId, userId } = req.body;
        const book = await bookModel.findById(bookId);
        if (!book || book?.availableCopies === 0) {
            throw new responseError(404, "book not found or not available ");
        }
        book.availableCopies -= 1;
        await bookModel.findByIdAndUpdate(bookId, book, { new: true });
        const transaction = await transactionModel.create({userId , bookId , status : "borrowed"});
        return successHandler(res, transaction);
    },


    returnBook : async (req, res) => {
        const { bookId, userId } = req.body;
        const book = await bookModel.findById(bookId);
        let transaction = await transactionModel.findById({bookId, userId, status: "borrowed"});
        if (!transaction) {
            transaction = await transactionModel.create({userId , bookId , status : "returned"});
            if (transaction) {
                throw new responseError(400, "Book already returned");
            } else throw new responseError(404, "Transaction not found");
        }
        if (!book || book?.availableCopies === 0) {
            throw new responseError(404, "book not found or not available ");
        }
        book.availableCopies += 1;
        await bookModel.findByIdAndUpdate(bookId, book, { new: true });
        const updatedTransaction = await transactionModel.findByIdAndUpdate(transaction._id , {status : "returned"} , { new: true });
        successHandler(res, updatedTransaction);
    },

    getUserTransaction : async (req, res) => {
        const userId = req.userId
        const userTransaction = await transactionModel.findById(userId , {} , {lean: true});
        if (!userTransaction) {
            throw new responseError(404, "user not found");
        }
        const transactionIds = userTransaction.map(transaction => transaction.bookId);
        const userBooks = await bookModel.findById({_id: {$in: transactionIds}} , {} , {lean: true});

        successHandler(res , {userTransaction , userBooks} ,)
    }

}

export default transactionService;



