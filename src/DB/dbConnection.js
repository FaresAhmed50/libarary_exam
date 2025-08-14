import mongoose from "mongoose";
import {configDotenv} from "dotenv";
configDotenv({ path: '.env' })

const dbConnection =() => {
    mongoose.connect(`${process.env.DBURL}/${process.env.DBNAME}`).then(() => {
        console.log("Connected to DB");
    }).catch(err => console.log(err));
}

export default dbConnection;