const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server Connected to MONGO_ATLAS`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};
module.exports = dbConnect;
