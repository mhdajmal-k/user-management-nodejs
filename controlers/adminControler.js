const user= require("../models/userModel");
const bcrypt = require("bcrypt");
// const render= require("../routers/userRouter");

const loadLogin = async (req, res) => {
  try {
    res.render("adminLogin");
  } catch (error) {
    console.log(error.message);
  }
};
const verifyLogin = async (req, res) => {
  try {
    const {email, password}= req.body
    console.log(email, password);
  

    // const userData=await user.findOne({email:email});
    

    const userData=await user.findOne({email : email})
    console.log(email+"its is my final email")

    console.log(userData, "hello")
    // console.log(email)

    if (userData) {
      //clear
      const passwordMatch =await bcrypt.compare(password,userData.password);
      console.log(passwordMatch);
      if (passwordMatch) {
        if (userData.is_admin === 0) {
          res.render("adminLogin", { message: "email and password is incorrect1" });
        } else {
          req.session.user_id= userData._id;
          res.redirect("/admin/home");
        }
      } else {
        res.render("adminLogin", { message: "email and password is incorrect 2" });
      }
    } else {
      res.render("adminLogin", { message: "email and password is incorrect  3" });
    }
  } catch (error) {
    console.log(error.message+"catched error");
  }
};
const loadDashboard =async (req, res) => {
  try {
    const userData=await user.findById({_id:req.session.user_id})
    res.render('home',{admin:userData})
  } catch (error) {
    console.log(error.message);
  }
};
const logout=async (req,res)=>{
    try {
        req.session.destroy();

        res.redirect('/admin')
        
    } catch (error) {
        console.log(error.message)
        
    }
}

const adminDashboard=async (req,res)=>{
    try {
        const userData=await user.find({is_admin:0})
        console.log(userData)
        console.log("testing")
        res.render('dashBoard',{users:userData})
        
    } catch (error) {
        console.log(error.message)
        
    }
}

const newUserLoad=async(req,res)=>{
  try {
    res.render('new-user')
    
  } catch (error) {
    console.log(error.message)
    
  }
}
const addUser=async(req,res)=>{
  try {
const name=req.body.name;
const email=req.body.email;
const mobile=req.body.mobile;
console.log(name)

const newUser=  new user({
name:name,
email:email,
mobile:mobile,
is_admin:0
})

const userData=await newUser.save()

if(userData){
  res.redirect("/admin/dashboard")

}else{
  res.render('new-user',{message:"something wrong"})

}


    
  } catch (error) {
    console.log(error.message+"from add userdata")
    
  }
}

const editUser=async (req,res)=>{
  try {
    //claer this
    const id=req.query.id
    console.log(id)
    const userData=await user.findById({_id:id})
    console.log(userData)
    if(userData){
      res.render("edit-User",{user:userData})

    }else{
res.redirect("/admin/dashboard")
    }

    
  } catch (error) {
    console.log(error.message)
  }
}

const updateUser=async (req,res)=>{
  try {
    console.log(req.body.id+"from updateUser")
    const newData=await user.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile}})

    res.redirect("/admin/dashboard")


    
  } catch (error) {
    
  }

}

const deleteUser=async (req,res)=>{
  try {

    const id=req.query.id;
    console.log(id+"its id")
    const deleteUser=await user.deleteOne({_id:id})
    console.log(deleteUser+"chinking")
    res.redirect("/admin/dashboard")

  } catch (error) {
    console.log(error.message)
  }
}



module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard,
  logout,
  adminDashboard,
  newUserLoad,
  addUser,
  editUser,
  updateUser,
  deleteUser
};
