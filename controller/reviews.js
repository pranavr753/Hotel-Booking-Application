const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

module.exports.createReview = async(req, res, next)=> {
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    console.log(newreview);
    listing.reviews.push(newreview);
    await listing.save();
    await newreview.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.deleteReview = async(req, res, next) => {
    let {id, reviewId} = req.params;
    console.log("reached here listing id is  " + id + " review is " + reviewId);
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};