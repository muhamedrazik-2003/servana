const services = require("../models/serviceModel");

exports.addService = async (req, res) => {
  try {
    const { title, description, category, subCategory, price, priceUnit } =
      req.body;
    console.log("Files received:", req.files); // ← This should not be undefined
    console.log("Body received:", req.body);
    const id = req.user.userId;
    const location = {
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    };
    const serviceImages = req.files.map((file) => file.path);
    const newService = new services({
      title,
      description,
      category,
      subCategory,
      price,
      priceUnit,
      status : "pending",
      location,
      providerId: id,
      images: serviceImages,
      avgRating: 0,
      totalReviews: 0,
      totalBookings: 0,
    });
    const savedService = await newService.save();
    res
      .status(201)
      .json({ message: "service Added Succesfully", service: savedService });
  } catch (error) {
    res.status(404).json({ message: "Failed To add Service", error });
  }
};

exports.getUserServices = async (req, res) => {
  try {
    const providerId = req.user.userId;
    // console.log(providerId);
    const serviceList = await services.find({ providerId });
    res
      .status(200)
      .json({ message: "services of Provider retrieved", serviceList });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Failed to retrieve provider services", error });
  }
};
