import 'dotenv/config'
import app from './app.js';
import dbConnection from "./db/dbCon.js"
dbConnection();

app.use('/',(req,res,error)=>{
    res.json({name:"aman",
        age:20
    })
})