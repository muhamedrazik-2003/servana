const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seeker", "provider"],
      required: true,
    },
    messageType: {
      type: String,
      enum: ["platformReview", "support"],
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const feedbacks = mongoose.model("feedbacks", feedbackSchema);
module.exports = feedbacks;
