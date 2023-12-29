const express=require("express");
const user_router=express()
const ejs=require("ejs")
const bodyParser=require("body-parser")
const session=require("express-session")


const userController=require("../controlers/userControler")
const config=require("../configure/config")
const auth=require("../middleware/auth");



user_router.use(session({
    secret:config.sessionSecret,
}))
 

user_router.use(bodyParser.json())
user_router.use(bodyParser.urlencoded({extended:true}))


user_router.set('view engine','ejs')
user_router.set("views","./views/user")

user_router.get("/register",auth.isLogout,userController.login)
user_router.post("/register",auth.isLogout,userController.insertUser)
user_router.get('/',auth.isLogout,userController.loginLoad)
user_router.get('/login',auth.isLogout,userController.loginLoad)
user_router.post('/login',userController.verifyLogin)
user_router.get("/home",auth.isLogin,userController.loadHome)
user_router.get("/logout",auth.isLogin,userController.userLogout)
user_router.get("/edit",auth.isLogin,userController.editLoad)
user_router.post("/edit",userController.updateProfile)



module.exports=user_router;  