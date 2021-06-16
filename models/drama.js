const mongoose = require("mongoose");

const dramaSchema = new mongoose.Schema({
  title: String,
  description: String,
  imagePath: String,
});

module.exports = mongoose.model("Drama", dramaSchema);
