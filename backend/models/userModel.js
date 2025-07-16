const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    trim:true,
     match: /^[6-9]\d{9}$/
  },
  role: {
    type: String,
    enum: ["admin", "provider", "seeker"],
    default: "seeker",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  location: {
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  isVerified : {
    type: Boolean,
    default: false
  },
  status : {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active"
  }
} , {timestamps: true});

const users = mongoose.model('users', userSchema);
module.exports = users