const User = require("../models/user");

module.exports.userSignUpGET = (req,res)=> {
    res.render("users/signup.ejs");
};

module.exports.userSignUpPOST = async(req,res)=> {
    try {
    let {username, email, password} = req.body;
    let newUser = new User({ username, email });
    let savedUser = await User.register(newUser, password);
    console.log(savedUser);
    req.login(savedUser, (err)=> {
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    });

    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.userLoginGET = (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.userLoginPOST = (req, res)=>{
    req.flash("success", "Welcome to Wanderlust!");
    console.log(res.locals.redirectUrl);
    res.redirect(res.locals.redirectUrl ? res.locals.redirectUrl : "/listings");
};

module.exports.userLogout = (req, res)=> {
    req.logout((err)=> {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
};