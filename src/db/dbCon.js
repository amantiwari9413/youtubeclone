import mongoose from "mongoose";
import app from "../app.js";
import DB_NAME from '../constant.js'


export default async function dbConnection(){
    try {
        const res=await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`db is running on port${res.connection.port}`)
        app.listen(process.env.PORT,()=>{
            console.log("server is running on port 3000");
        })
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}