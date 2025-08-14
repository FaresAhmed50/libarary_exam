import bookModel from "../../models/book.model.js";
import successHandler from "../../utils/succsessHandler.js";
import responseError from "../../utils/errorHandler.js";


const bookService = {


    createBook: async (req, res) => {
        const book = req.body;
        const result = await bookModel.create(book);
        successHandler(res, result);
    },

    getAllBooks : async (req, res) => {
        const books = await bookModel.find();
        successHandler(res, books);
    },

    updateBook : async (req, res) => {
        const bookId = req.params.id;
        const book = req.body;
        const result = await bookModel.findByIdAndUpdate(bookId, book, { new: true });
        if (!result) throw new responseError(404, "book not found");
        successHandler(res, result);
    },

    deleteBook : async (req, res) => {
        const bookId = req.params.id;
        const result = await bookModel.findByIdAndDelete(bookId);
        if (!result) {
            throw new responseError(404, "book not found");
        }
        successHandler(res, result);
    }



}




export default bookService;
