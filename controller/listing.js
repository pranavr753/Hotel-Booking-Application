const Listing = require("../models/listing.js");

module.exports.index = async(req, res)=> {
    let result = await Listing.find();
    res.render("listings/index.ejs", {allListings: result});
};

module.exports.renderNewForm = (req, res)=> {
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req, res)=> {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.newListing = async(req, res, next)=> {
    //let {title, description, image, price, location, country} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;

    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = {url, filename};
    await listing.save(); 
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.editListing = async(req, res)=> {
    let {id} = req.params;
    let editListing = await Listing.findById(id);
    if(!editListing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalImageURL = editListing.image.url;
    originalImageURL = originalImageURL.replace("/upload", "/upload/w_250");
    console.log(originalImageURL);
    res.render("listings/edit.ejs", {listing: editListing, originalImageURL: originalImageURL});
};

module.exports.modifyListing = async(req, res)=> {
    let {id} = req.params;
    let listingEdit = req.body.listing;
    let listingUpdated = await Listing.findByIdAndUpdate(id, { ...listingEdit });

    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listingUpdated.image = { url, filename };
        await listingUpdated.save();
    }
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req, res)=> {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};