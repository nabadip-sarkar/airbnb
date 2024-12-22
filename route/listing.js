const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utilities/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middlewares.js");
const listingColtroller = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingColtroller.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingColtroller.createListing));

//new listing
router.get("/new",isLoggedIn,listingColtroller.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingColtroller.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingColtroller.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingColtroller.destroyListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingColtroller.renderEditForm));
module.exports = router;