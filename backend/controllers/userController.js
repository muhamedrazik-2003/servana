const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

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
      user: userExist,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.userRegister = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    console.log("body recieved",  req.body)
    const userExist = await users.findOne({ email });
    console.log(userExist)
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
      user: newUser,
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
    const newProfile = req.file?.path || req.body.profilePicture;
    // console.log("profile image", newProfile);
    const location = {
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    };
    // console.log("req. body recieved", req.body);
    const { fullName, email, password, phone, dateOfBirth, gender } = req.body;
    const updatedUser = await users.findByIdAndUpdate(
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
    if (!updatedUser) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({
      message: "User Updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllProviders = async (req, res) => {
  try {
    const allProviders = await users.find({role:"provider"});
    res
      .status(200)
      .json({ message: "All providers retrieved", allProviders });

  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
exports.getAllseekers = async (req, res) => {
  try {
    const allSeekers = await users.find({role:"seeker"});
    res
      .status(200)
      .json({ message: "All seekers retrieved", allSeekers });

  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await users.findById(userId);
   
    if(user.profilePicture !== "Not Available" || user.profilePicture !== "") {
      await cloudinary.uploader.destroy(user.profilePicture);
    }

    const deletedData = await users.findByIdAndDelete(userId);
    if (!deletedData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User Deleted successfully",
      deletedUser: deletedData,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.changeUserAccountStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { verification, accountStatus } = req.body;
    // console.log(userId);
    // console.log(verification)
    // console.log(accountStatus)

    const updatedUserData = await users
      .findByIdAndUpdate(userId, { isVerified: verification,status: accountStatus }, { new: true })

    console.log("updatedUser", updatedUserData);
    if (!updatedUserData) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({
      message: "User Status Updated successfully",
      updatedUser: updatedUserData,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};