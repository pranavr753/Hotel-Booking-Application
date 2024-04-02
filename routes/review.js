const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {IsLoggedIn, isOwner, isReviewAuthor} = require("../middleware.js");

const validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(!error){
        next();
    }
    else{
        let errorMsg = error.details.map((ele)=>ele.message).join(", ");
        next(new ExpressError(400, errorMsg));
    }
};

const reviewController = require("../controller/reviews.js");

router.post("/", IsLoggedIn, validateReview, wrapAsync(reviewController.createReview));

router.delete("/:reviewId", IsLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;