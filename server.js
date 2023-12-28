const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system")

const express=require("express")
const app=express()
const user_router=require("./routers/userRoutrer")

app.use('/',user_router)

const port=3000;
app.listen(port,()=>{
    console.log("server is running...")
})
