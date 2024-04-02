const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const Listing = require("./models/listing");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/reviews.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
require('dotenv').config();
const db_url = process.env.ATLASDB_URL;

const store = MongoStore.create({
    mongoUrl: db_url,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24*3600
});

store.on("error", (err)=>{
    console.log("Error in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"));
app.engine('ejs', ejsMate);
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';


main().then(res => console.log('connected to DB')).catch(err => console.log(err));

async function main() {
    await mongoose.connect(db_url);  
}

// app.get("/", (req, res)=>{
//     res.redirect("/listings");
// });

// app.get("/demouser", async(req,res)=> {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "rumblybard48"
//     });
//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });

app.use((req, res, next)=> {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.isUserLoggedIn = req.user;
    next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


app.all("*", (req, res, next)=> {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next)=> {   //will trigger even if you do --throw new ExpressError-- or do -- next(new ExpressError(404, "Not valid"))-- 
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", {message});
    //res.status(statusCode).send(message);
});

app.listen(8080, ()=> {
    console.log("Listening on port 8080");
});