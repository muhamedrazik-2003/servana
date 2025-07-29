const reviews = require("../models/reviewModel");
const services = require("../models/serviceModel");

exports.addNewReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("seekerId", userId);
    const { serviceId, providerId, bookingId, rating, comment } = req.body;
    console.log("Body received:", req.body);

    const existingReview = await reviews.findOne({ bookingId });
    console.log(existingReview);
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this booking." });
    }

    if (!rating || !comment) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const newReview = new reviews({
      serviceId,
      providerId,
      bookingId,
      seekerId: userId,
      rating,
      comment,
    });
    const savedReview = await newReview.save();

    if (savedReview) {
      const updatedService = await services.findByIdAndUpdate(serviceId, {
        $inc: { totalReviews: 1 },
      });
      const allReviews = await reviews.find({ serviceId });
      const avgRating =
        allReviews.reduce((prev, current) => prev + current.rating, 0) /
        updatedService.totalReviews;
      await services.findByIdAndUpdate(serviceId, {
        avgRating,
      });
    }

    const populatedReview = await reviews
      .findById(savedReview._id)
      .populate("seekerId")
      .populate("providerId")
      .populate("serviceId");

    console.log(populatedReview);
    res.status(201).json({
      message: "Review Added Succesfully",
      newReviewData: populatedReview,
    });
  } catch (error) {
    res.status(404).json({ message: "Failed To add Review", error });
  }
};
