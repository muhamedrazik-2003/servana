const bookings = require("../models/BookingModel");


exports.addNewBooking = async (req, res) => {
  try {
    const { serviceId, providerId, scheduledDate,scheduledTime,seekerNotes, duration, durationUnit } =
      req.body;
    console.log("Body received:", req.body);

    if (
      !scheduledDate ||
      !scheduledTime ||
      !duration ||
      !durationUnit
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }
    const userId = req.user.userId;
    const location = {
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    };
    const newBooking = new bookings({
      serviceId,
      providerId,
      seekerId : userId,
      scheduledDate,
      scheduledTime,
      location,
      seekerNotes,
      paymentStatus : "pending",
      bookingStatus : "pending",
      reason : "Not Available",
      duration,
      durationUnit
    });
    const savedBooking = await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking Added Succesfully", service: savedBooking });
  } catch (error) {
    res.status(404).json({ message: "Failed To add Booking", error });
  }
};

exports.getSeekerBookings = async (req, res) => {
  try {
    const seekerId = req.user.userId;
    const serviceList = await bookings.find({ seekerId });
    res
      .status(200)
      .json({ message: "Bookings of User retrieved", serviceList });
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};