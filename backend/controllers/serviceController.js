const services = require("../models/serviceModel");
const cloudinary = require("../config/cloudinary");

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
    const serviceImages = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

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
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const location = {
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    };
    const newImages = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    let existingImages = req.body.images || [];

    if (!Array.isArray(existingImages)) {
      existingImages = [existingImages];
    }
    const service = await services.findById(id);

    const imagesTodelete = service.images.filter(
      (oldImage) =>
        !existingImages.some((img) => img.public_id === oldImage.public_id)
    );
    for (const img of imagesTodelete) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    const serviceImages = [...existingImages, ...newImages];
    console.log(serviceImages);
    const { title, description, category, subCategory, price, priceUnit } =
      req.body;
    const updatedData = await services.findByIdAndUpdate(
      id,
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
    console.log(updatedData);
    if (!updatedData) {
      res.status(404).json({ message: "Service Not Found" });
    }
    res.status(200).json({
      message: "Service Updated successfully",
      updatedService: updatedData,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await services.findById(id);

    const imagesTodelete = service.images
    
    for (const img of imagesTodelete) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    const deletedData = await services.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({
      message: "Service Deleted successfully",
      deletedService: deletedData,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
