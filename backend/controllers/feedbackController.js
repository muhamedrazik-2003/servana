const feedbacks = require("../models/feedbackModel");

exports.addNewFeedback = async (req, res) => {
  try {
    const { name, email, role, messageType, message, rating } = req.body;
    console.log("Body received:", req.body);

    if (messageType === "platformReview") {
      const existingFeedback = await feedbacks.findOne({
        email,
        messageType: "platformReview",
      });
      console.log(existingFeedback);
      if (existingFeedback) {
        return res
          .status(400)
          .json({ message: "You already reviewed this booking." });
      }
    }

    const newFeedback = new feedbacks({
      name,
      email,
      role,
      messageType,
      message,
      rating,
    });
    const savedFeedback = await newFeedback.save();
    console.log(savedFeedback);
    res.status(201).json({
      message: "feedback Added Succesfully",
      newFeedbackData: savedFeedback,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Failed To add Feedback", error });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbackList = await feedbacks.find();
    res.status(200).json({ message: "All feedbacks retrieved", feedbackList });
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
