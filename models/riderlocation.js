const mongoose = require("mongoose");

const riderLocationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  latitude: {
    type: Number,
    default: 0,
  },

  longitude: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RiderLocation", riderLocationSchema);
