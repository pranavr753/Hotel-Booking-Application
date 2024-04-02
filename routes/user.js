const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");

router
.route("/signup")
.get(userController.userSignUpGET)
.post(wrapAsync(userController.userSignUpPOST));

router
.route("/login")
.get(userController.userLoginGET)
.post(redirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.userLoginPOST);


router.get("/logout", userController.userLogout);

module.exports = router;