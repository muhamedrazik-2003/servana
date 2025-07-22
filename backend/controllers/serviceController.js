const services = require("../models/serviceModel");

exports.addService = async (req, res) => {
  try {
    const { title, description, category, subCategory, price, priceUnit } =
      req.body;
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
    const providerId = req.user.id;
    console.log(providerId);
    const ServiceList = await services.find({ providerId });
    res
      .status(200)
      .json({ message: "services of Provider retrieved", ServiceList });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Failed to retrieve provider services", error });
  }
};
