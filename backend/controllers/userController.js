const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await users.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (userExist.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: userExist._id }, process.env.SECRET_KEY);
    res.status(200).json({
      message: "Login Success",
      user: {
        id: userExist._id,
        fullName: userExist.fullName,
        role: userExist.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.userRegister = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const userExist = await users.findOne({ email });

    if (userExist) {
      return res.status(409).json({ message: "User Already exists" });
    }
    const newUser = new users({
      fullName,
      email,
      password,
      phone: "",
      role,
      profilePicture: "Not Available",
      location: {
        city: "Not Available",
        state: "Not Available",
        pincode: "Not Available",
      },
      isVerified: false,
      status: "active",
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
    res.status(201).json({
      message: "Registration Success",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log("user id", userId);
    const newProfile = req.file.path || req.body.profile;
    // console.log("profile image", newProfile);
    const location = {
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    };
    // console.log("req. body recieved", req.body);
    const { fullName, email, password, phone, dateOfBirth, gender } = req.body;
    const updatedProfile = await users.findByIdAndUpdate(
      userId,
      {
        fullName,
        dateOfBirth,
        gender,
        email,
        password,
        phone,
        profilePicture: newProfile,
        location,
      },
      { new: true }
    );
    // console.log("updated data", updatedProfile);
    if (!updatedProfile) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({
      message: "User Updated successfully",
      updatedService: updatedProfile,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
