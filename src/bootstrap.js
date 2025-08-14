import dbConnection from "./DB/dbConnection.js";
import userRouter from "./modules/user/user.controller.js";
import bookRouter from "./modules/book/book.controller.js";
import transactionRouter from "./modules/transaction/transaction.controller.js";


const bootstrap = (express , app ) => {


app.use(express.json());

dbConnection();


app.use("/api/users" , userRouter);
app.use("/api/books", bookRouter);
app.use("/api/transactions", transactionRouter);

}



export default bootstrap;