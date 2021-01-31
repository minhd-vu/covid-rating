const router = require("express").Router();
const Place = require("../models/place.model");

router.route("/:id").get(function (req, res) {
    console.log(req.params.id);

    Place.findOne({ "placeId": req.params.id }, async function (err, place) {
        if (err) console.log(err);

        if (!place) {
            return res.status(204).send();
        }

        await place.execPopulate("reviews.user");
        res.status(200).send(place);
    })
});

module.exports = router;