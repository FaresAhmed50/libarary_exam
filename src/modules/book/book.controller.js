import Router from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import bookService from "./book.service.js";
import {validate} from "../../middlewares/validateSchema.middleware.js";
import {bookSchema} from "../../utils/validationSchema.js";

const bookRouter = Router();


bookRouter.route("/addBooks").post( validate(bookSchema) , authenticate , bookService.createBook )
bookRouter.route("/allBooks").get(authenticate , bookService.getAllBooks)
bookRouter.route("/:id").put( validate(bookSchema) , authenticate , bookService.updateBook)
bookRouter.route("/:id").delete( bookService.deleteBook )


export default bookRouter;
























