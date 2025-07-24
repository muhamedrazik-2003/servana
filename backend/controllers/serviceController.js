const services = require("../models/serviceModel");

exports.addService = async (req, res) => {
  try {
    const { title, description, category, subCategory, price, priceUnit } =
      req.body;
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);

    if (
      !title ||
      !description ||
      !category ||
      !subCategory ||
      !price ||
      !priceUnit
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }

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
      status: "pending",
      location,
      providerId: id,
      images: serviceImages,
      avgRating: 3,
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

exports.updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const location = {
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    };
    const newImages = req.files.map((file) => file.path);
    let existingImages = req.body.images || [];

    if (!Array.isArray(existingImages)) {
      existingImages = [existingImages];
    }
    const serviceImages = [...existingImages,...newImages];
    console.log(serviceImages)
    const { title, description, category, subCategory, price, priceUnit } =
      req.body;

    const updatedData = await services.findByIdAndUpdate(
      serviceId,
      {
        title,
        description,
        category,
        subCategory,
        price,
        priceUnit,
        location,
        images: serviceImages,
      },
      { new: true }
    );
    console.log(updatedData)
    if (!updatedData) {
      res.status(404).json({ message: "Service Not Found" });
    }
    res
      .status(200)
      .json({ message: "Service Updated successfully", service: updatedData });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Failed to update provider services", error });
  }
};
