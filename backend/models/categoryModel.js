const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    subCategories: {
      type: [String],
      default: [],
    },
    pendingSubCategories: [
      {
        name: String,
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
      },
    ],
  }
);

const categories = mongoose.model("categories", categorySchema);
module.exports = categories;
