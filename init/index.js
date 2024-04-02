const mongoose = require("mongoose");
const Schema = new mongoose.Schema;
const dataInit = require("./data");
const Listing = require("../models/listing");

main().then(res => console.log('connected to DB')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');  
}
const initDB = async() => {
    await Listing.deleteMany({});
    dataInit.data = dataInit.data.map((obj) => ({...obj, owner:  '65f9c5ca0937e522003c849b'}));
    await Listing.insertMany(dataInit.data);
    console.log("data was init");
}
initDB();