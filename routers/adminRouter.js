const express=require("express")
const admin_router=express();

const session=require("express-session")
const config=require("../configure/config")
const nocache=require("nocache")

const bodyParser=require("body-parser");
const adminController=require("../controlers/adminControler")

admin_router.use(session({secret:config.sessionSecret}))
admin_router.use(nocache())

admin_router.use(bodyParser.json())
admin_router.use(bodyParser.urlencoded({extended:true}))


admin_router.set('view engine','ejs')
admin_router.set('views','./views/admin');
const auth=require("../middleware/adminAuth")

admin_router.get('/',auth.isLogout,adminController.loadLogin);
admin_router.post('/',adminController.verifyLogin)


admin_router.get('/home',auth.isLogin,adminController.loadDashboard)
admin_router.get('/logout',auth.isLogin,adminController.logout)
admin_router.get('/dashboard',auth.isLogin,adminController.adminDashboard)
admin_router.get('/new-user',auth.isLogin,adminController.newUserLoad)
admin_router.post('/new-user',adminController.addUser)
admin_router.get('/edituser',adminController.editUser)
admin_router.post('/edituser',adminController.updateUser)
admin_router.get("/delete",adminController.deleteUser)




admin_router.get('*',function(req,res){
    res.redirect("/admin")
  
})
module.exports=admin_router;




