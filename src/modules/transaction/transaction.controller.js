import Router from "express";
import {validate} from "../../middlewares/validateSchema.middleware.js";
import {borrowSchema} from "../../utils/validationSchema.js";
import transactionService from "./transaction.service.js";
import authenticate from "../../middlewares/auth.middleware.js";

const transactionRouter = Router();




transactionRouter.route("/borrow").post(validate(borrowSchema) , transactionService.borrowBook);
transactionRouter.route("/return/:id").get(transactionService.returnBook);
transactionRouter.route("/user").get(authenticate , transactionService.getUserTransaction);




export default transactionRouter;



































