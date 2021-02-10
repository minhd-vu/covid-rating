
const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
    placeId: { type: String, unique: true, required: true },
    reviews: [{
        user: { type: mongoose.Types.ObjectId, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        date: { type: Date, required: true },
    }]
});

module.exports = mongoose.model("Place", PlaceSchema);