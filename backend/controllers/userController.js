const users = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await users.findOne({ email });
    if (!userExist) {
      return res.status(400).json({message: "User not Found"});
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res.status(401).json({message: "Invalid password" });
    }

    res.status(200).json("login Successful", users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.userRegister = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const userExist = await users.findOne({ email });

    if (userExist) {
      return res.status(409).json({ message: "User Already exists", user: userExist });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // for hashing
    const newUser = new users({
      fullName,
      email,
      password: hashedPassword,
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
    res
      .status(201)
      .json({ message: "User Registration Success", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
