const express = require('express');
const router = express.Router();
const jwt = require("../middlewares/jwtMiddleware");

const bookingController = require("../controllers/BookingController");

router.get('/',jwt, bookingController.getSeekerBookings);
router.post('/new',jwt, bookingController.addNewBooking);

module.exports = router;