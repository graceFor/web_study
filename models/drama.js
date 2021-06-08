const mongoose = require("mongoose");

const dramaSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Drama", dramaSchema);
