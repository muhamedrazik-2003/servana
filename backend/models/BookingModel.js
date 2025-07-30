const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    serviceId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: true,
    },
    seekerId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    scheduledDate: {
      type: String,
      required: true,
    },
    scheduledTime: {
      type: String,
      enum: ["9:00 AM", "12:00 AM", "3:00 PM"],
      default: "9:00 AM",
    },
    location: {
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
    seekerNotes: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending","cancelled","failed"],
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: ["ongoing", "pending", "completed", "failed", "cancelled"],
      default: "pending",
    },
    reason: {
      type: String,
    },
    duration: {
      type: Number,
    },
    durationUnit: {
      type: String,
      enum: ["hour", "day", "service"],
      default: "hour",
    },
    totalPrice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const bookings = mongoose.model("bookings", bookingSchema);
module.exports = bookings;
