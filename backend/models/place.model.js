
const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
    placeId: String,
    reviews: [{
        user: mongoose.Types.ObjectId,
        rating: Number,
        comment: String
    }]
});

module.exports = mongoose.model("Place", PlaceSchema);