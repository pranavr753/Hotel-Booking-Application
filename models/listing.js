const mongoose = require("mongoose");
const Review = require("./reviews");
const User = require("./user.js");
const Schema = mongoose.Schema;
const defaultImg = "https://images.unsplash.com/photo-1682695798522-6e208131916d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const listingSchema = new Schema({
    title: {
       type: String,
       required: true
    },
    description: String,
    image: {
      url: String,
      filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
         type: Schema.ObjectId,
         ref: "Review"
      }
    ],
    owner:
      {
         type: Schema.ObjectId,
         ref: "User"
      }
});

listingSchema.post("findOneAndDelete", async(listing)=> {
   if (listing)
      await Review.deleteMany({_id: {$in: listing.reviews}})
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;