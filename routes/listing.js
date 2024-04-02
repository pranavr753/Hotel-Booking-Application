if(process.env.NODE_ENV != "Production"){
    require('dotenv').config();
}

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const {IsLoggedIn, isOwner} = require("../middleware.js");
const multer  = require('multer');

const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
//cloudinary and multer


const listingController = require("../controller/listing.js");

const validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(!error){
        next();
    }
    else{
        let errorMsg = error.details.map((ele)=>ele.message).join(", ");
        next(new ExpressError(400, errorMsg));
    }
};

//Index Route && create route
router
.route("/")
.get(wrapAsync(listingController.index))
.post(IsLoggedIn, /*validateListing,*/ upload.single('listing[image]'), wrapAsync(listingController.newListing));
// .post(upload.single('listing[image]'), (req,res)=> {
//     res.send(req.file);
// });

//new route
router.get("/new", IsLoggedIn, listingController.renderNewForm);

//show route, update route and delete route
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(IsLoggedIn, isOwner, /*validateListing,*/ upload.single('listing[image]'), wrapAsync(listingController.modifyListing))
.delete(IsLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//show route
router;

//edit route
router.get("/:id/edit", IsLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router;