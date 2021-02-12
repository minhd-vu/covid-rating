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

router.route("/").post(function (req, res) {
    console.log(req.body);

    Place.findOneAndUpdate({ "placeId": req.body.placeId }, async function (err, place) {
        if (err) console.log(err);

        if (!place) {
            place = new Place({
                placeId: req.body.placeId,
            });
        }

        place.reviews.push({
            user: req.user,
            rating: req.body.rating,
            comment: req.body.comment,
            date: Date.now(),
        });

        await place.save();

        res.status(200).send();
    });
});

module.exports = router;