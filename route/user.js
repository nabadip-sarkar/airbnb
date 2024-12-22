const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utilities/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignupform)
.post(wrapAsync(userController.signupUser));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login",failureFlash:true }),userController.loginUser );


//logout user
router.get("/logout",userController.logoutUser);

module.exports = router;