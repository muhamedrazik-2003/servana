const express = require('express');
const router = express.Router();
const jwt = require("../middlewares/jwtMiddleware");

const bookingController = require("../controllers/BookingController");

router.get('/',jwt, bookingController.getAllBookings);
router.get('/user',jwt, bookingController.getSeekerBookings);
router.get('/provider',jwt, bookingController.getProviderBookings);
router.post('/new',jwt, bookingController.addNewBooking);

module.exports = router;