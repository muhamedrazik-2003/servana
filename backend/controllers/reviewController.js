const reviews = require("../models/reviewModel");
const services = require("../models/serviceModel");

exports.addNewReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log("seekerId", userId);
    const { serviceId, providerId, bookingId, rating, comment } = req.body;
    // console.log("Body received:", req.body);

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
      status: "active"
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
      .populate("seekerId");

    res.status(201).json({
      message: "Review Added Succesfully",
      newReviewData: populatedReview,
    });
  } catch (error) {
    res.status(404).json({ message: "Failed To add Review", error });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviewList = await reviews
      .find()
      .populate("seekerId")
      .populate("providerId")
      .populate("bookingId")
      .populate("serviceId");
    res.status(200).json({ message: "All Reviews retrieved", reviewList });
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
exports.getAllProviderReviews = async (req, res) => {
  try {
    const providerId = req.user.userId;
    const reviewList = await reviews
      .find({providerId})
      .populate("seekerId")
      .populate("providerId")
      .populate("bookingId")
      .populate("serviceId");
    res.status(200).json({ message: "All Provider Reviews retrieved", reviewList });
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;
    // console.log(serviceId)
    const reviewList = await reviews
      .find({ serviceId })
      // .populate("bookingId")
      .populate("seekerId");
    // .populate("providerId")
    // .populate("serviceId");
    // console.log(reviewList);
    res.status(200).json({ message: "service Reviews retrieved", reviewList });
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.changeReviewStatus = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { status } = req.body;
    // console.log(serviceId);
    // console.log(status)

    const updatedReviewData = await reviews
      .findByIdAndUpdate(reviewId, { status }, { new: true })
      .populate("seekerId")
      .populate("providerId")
      .populate("bookingId")
      .populate("serviceId");

    if (!updatedReviewData) {
      res.status(404).json({ message: "Review Not Found" });
    }
    res.status(200).json({
      message: "Review Status Updated successfully",
      updatedReview: updatedReviewData,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};