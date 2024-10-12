import mongoose from "mongoose";
import DB_NAME from '../constant.js'

export default async function dbConnection(){
    try {
        const res=await mongoose.connect(`${process.env.DB_URL}`)
        console.log(`db is running on port${res.connection.port}`)
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}