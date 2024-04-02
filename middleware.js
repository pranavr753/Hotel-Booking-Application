const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");

module.exports.IsLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You need to be logged in to add a new listing.");
        return res.redirect("/login");
    }
    next();
}

module.exports.redirectUrl = (req,res,next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next) => {
    let {id} = req.params;
    //verify if curr logged in user and id actually match
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.isUserLoggedIn._id)){
        req.flash("error", "You don't have permissions on this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req,res,next) => {
    let {id, reviewId} = req.params;
    console.log(req.params);
    //verify if curr logged in user and id actually match
    let review = await Review.findById(reviewId);
    console.log(review);
    if(!review.author){
        req.flash("error", "You don't have permissions for this review");
        return res.redirect(`/listings/${id}`);
    }
    else if(!review.author.equals(res.locals.isUserLoggedIn._id)){
        req.flash("error", "You don't have permissions for this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}