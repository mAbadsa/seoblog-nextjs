const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    sulg: {
      type: String,
      unique: true,
      index: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
