const bookings = require("../models/BookingModel");
const services = require("../models/serviceModel");

exports.addNewBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      serviceId,
      providerId,
      scheduledDate,
      scheduledTime,
      seekerNotes,
      duration,
      durationUnit,
      totalPrice,
      location,
    } = req.body;
    console.log("Body received:", req.body);

    if (
      !scheduledDate ||
      !scheduledTime ||
      !duration ||
      !durationUnit ||
      !totalPrice
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }
    console.log("location", location);

    const newBooking = new bookings({
      serviceId,
      providerId,
      seekerId: userId,
      scheduledDate,
      scheduledTime,
      location,
      seekerNotes,
      paymentStatus: "pending",
      bookingStatus: "pending",
      reason: "Not Available",
      duration,
      durationUnit,
      totalPrice,
    });
    const savedBooking = await newBooking.save();
    if (savedBooking) {
      await services.findByIdAndUpdate(serviceId, {
        $inc: { totalBookings: 1 },
      });
    }

    const populatedBooking = await bookings
      .findById(savedBooking._id)
      .populate("seekerId")
      .populate("providerId")
      .populate("serviceId");

    console.log(populatedBooking);
    res.status(201).json({
      message: "Booking Added Succesfully",
      newBookingData: populatedBooking,
    });
  } catch (error) {
    res.status(404).json({ message: "Failed To add Booking", error });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookingList = await bookings
      .find()
      .populate("seekerId")
      .populate("providerId")
      .populate("serviceId");
    res
      .status(200)
      .json({ message: "Bookings of User retrieved", bookingList });
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getSeekerBookings = async (req, res) => {
  try {
    const seekerId = req.user.userId;
    const bookingList = await bookings
      .find({ seekerId })
      .populate("seekerId")
      .populate("providerId")
      .populate("serviceId");
    res
      .status(200)
      .json({ message: "Bookings of User retrieved", bookingList });
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
exports.getProviderBookings = async (req, res) => {
  try {
    const providerId = req.user.userId;
    const bookingList = await bookings
      .find({ providerId })
      .populate("seekerId")
      .populate("providerId")
      .populate("serviceId");
    res
      .status(200)
      .json({ message: "Bookings of Provider retrieved", bookingList });
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.changeBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { bookingStatus, reason } = req.body;
    console.log(bookingId);
    console.log("booking status", bookingStatus);
    const updatedBookingData = await bookings
      .findByIdAndUpdate(bookingId, { bookingStatus, reason }, { new: true })
      .populate("seekerId")
      .populate("providerId")
      .populate("serviceId");

    console.log("updatedBooking", updatedBookingData);
    if (!updatedBookingData) {
      res.status(404).json({ message: "Booking Not Found" });
    }
    res.status(200).json({
      message: "booking Status Updated successfully",
      updatedBooking: updatedBookingData,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
