import 'dotenv/config'
import app from './app.js';
import dbConnection from "./db/dbCon.js"
dbConnection()
.then((res)=>{
    app.listen(process.env.PORT,()=>{
        console.log("server is running on port 3000");
    })
})
.catch((error)=>{
    console.log(error)
})

app.use('/',(req,res,error)=>{
    res.json({name:"aman",
        age:20
    })
})



