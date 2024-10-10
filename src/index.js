import app from './app.js'

app.use('/',(req,res,err)=>{
    res.json({name:"aman",
        age:25
    })
})