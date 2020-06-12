const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 160,
    },
    slug: {
      type: String,
      index: true,
    },
    body: {
      type: {},
      minlength: 200,
      required: true,
    },
    excerpt: {
      type: String,
      max: 1000,
    },
    mtitle: {
      type: String,
    },
    mdesc: {
      type: String,
    },
    photo: {
      type: Buffer,
      contentType: String,
    },
    categories: [
      { type: mongoose.Schema.ObjectId, ref: "Category", required: true },
    ],
    tags: [{ type: mongoose.Schema.ObjectId, ref: "Tag", required: true }],
    postedBy: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
