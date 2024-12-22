const User = require("../models/user");


module.exports.renderSignupform = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signupUser = async(req,res,next)=>{
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser =await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        })
        
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    
}
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginUser =  async(req,res)=>{
    req.flash("success","Welcome to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Logged Out successfully!");
        res.redirect("/listings");
    })
}