const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
      required: true,
    },
    images: [
      {
        url : {type: String, required: true},
        public_id : {type: String, required: true},
      }
    ],
    price: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      enum: ["hour", "day", "service"],
      default: "service",
    },
    status: {
      type: String,
      enum: ["active", "rejected", "flagged", "pending","inactive"],
      default: "pending",
    },
    location: {
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    avgRating: {
      type: Number,
    },
    totalReviews: {
      type: Number,
    },
    totalBookings: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

const services = mongoose.model("services", serviceSchema);
module.exports = services;
