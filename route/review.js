const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utilities/wrapAsync.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middlewares.js");

const reviewController = require("../controllers/reviews.js");

//Reviews Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
//Delete Review Route
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
module.exports = router;