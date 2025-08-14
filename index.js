import express from 'express';
import bootstrap from "./src/bootstrap.js";
const app = express();



bootstrap(express , app);



app.listen(`${process.env.PORT}` , () => {
    console.log("App listening on port 3000");
})