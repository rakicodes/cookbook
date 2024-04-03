const mongoose = require("mongoose");

const Recipe = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    cloudinaryId: {
      type: String,
      require: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

Recipe.index({ name: "text" });
module.exports = mongoose.model("Recipe", Recipe);
