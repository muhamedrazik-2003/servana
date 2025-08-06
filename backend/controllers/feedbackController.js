const feedbacks = require("../models/feedbackModel");

exports.addNewFeedback = async (req, res) => {
  try {

    const { name, email, role, messageType, message } = req.body;
    console.log("Body received:", req.body);

    if(messageType === "platformReview") {
        const existingFeedback = await reviews.findOne({ email, messageType : "platformReview" });
        // console.log(existingFeedback);
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
     message
    });
    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      message: "feedback Added Succesfully",
      newFeedbackData: savedFeedback,
    });
  } catch (error) {
    res.status(404).json({ message: "Failed To add Feedback", error });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbackList = feedbacks.find();
    res.status(200).json({ message: "All feedbacks retrieved", feedbackList });
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};