const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const securePassword = async (password) => {
  try {
    const passwordHashed = await bcrypt.hash(password, 10);
    return passwordHashed;
  } catch (error) {
    console.log(error.message);
  }
};

//for send mail
const sendVerifyMail = async (name, email, user_id) => {
  try {
    nodemailer.createTransport({
      host: "smpt.gmail.com  ",
    });
  } catch (error) {
    console.log(error.message);
  }
};
//clear this
const login = async (req, res) => {
  try {
    res.render("registration");
  } catch (error) {
    console.log(error.message);
    console.log("its from here1");
  }
};
const insertUser = async (req, res) => {
  try {
    const spassWord = await securePassword(req.body.password);
    const userdata = new user({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: spassWord,
      is_admin: 0,
    });
    const userData = await userdata.save();

    if (userData) {
      sendVerifyMail(req.body.name, req.body.email, userData._id);

      res.render("registration", {
        message:
          "your registration was been successfully.please verify your mail",
      });
      console.log("done");
    } else {
      console.log("registration is failed");
      res.render("registration", { message: "filed registration" });
    }
  } catch (error) {
    console.log(error.message);
    console.log("its from here2");
  }
};
const loginLoad = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userDAta = await user.findOne({ email: email });

    if (userDAta) {
      const passwordMatch = await bcrypt.compare(password, userDAta.password);
      if (passwordMatch) {
        if (userDAta.is_varified === 0) {
          res.render("loging", { message: "please verify you mail" });
        } else {
          req.session.user_id = userDAta._id;
          console.log(req.session.user_id);
          res.redirect("/home");
        }
      } else {
        res.render("login", { message: "email and password is incorrect" });
      }
    } else {
      res.render("login", { message: "email and password is incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const loadHome = async (req, res) => {
  try {
    const userData = await user.findOne({ _id: req.session.user_id });

    res.render("home", { user: userData, message: "hello testing" });
    console.log("testig in loadhome");
  } catch (error) {
    console.log(error.message);
  }
};
const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

// user edit

const editLoad = async (req, res) => {
  try {
    const id = req.query.id;
    const userData = await user.findById({ _id: id });

    if (userData) {
      res.render("edit", { user: userData });
    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { user_id, name, email, mobile } = req.body;

    // const userData = await user.findByIdAndUpdate({_id:user_id},{
    //     name:name,
    //     email:email,
    //     mobile:mobile,
    // },{new:true});

    const userData = await user.findById(user_id);

    userData.name = name;
    userData.email = email;
    userData.mobile = mobile;

    await userData.save();

    console.log(userData, "this is user data///////");
    if (userData) {
        res.redirect("/home");
    } else {
        res.redirect("/login");
    }
  } catch (error) {
    console.log(error.message + "form updateProfile");
  }
};

module.exports = {
  login,
  insertUser,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
  editLoad,
  updateProfile,
};
