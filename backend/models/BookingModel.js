const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: true,
  },
  seekerId: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  scheduledDate: {
    type: String,
    required: true,
  },
   scheduledTime : {
    type:String,
    enum: ["9am-11am", "12am-2pm", "3pm-5pm"],
    default: "9am-11am",
  },
  location: {
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
  },
  seekerNotes : {
    type:String
  },
  paymentStatus : {
    type:String,
    enum: ["paid", "pending"],
    default: "pending",
  },
  bookingStatus : {
    type:String,
    enum: ["ongoing", "pending", "completed", "failed", "cancelled"],
    default: "pending",
  },
  reason : {
    type: String,
  },
  duration : {
    type : Number,
  },
  durationUnit : {
    type: String,
    enum : ["hour", "day", "service"],
    default : "hour"
  }
},
{timestamps: true}
);

const bookings = mongoose.model("bookings", bookingSchema);
module.exports = bookings;