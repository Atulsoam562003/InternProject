const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleParkings = new Schema(
  {
    vehicle_parking_id: { type: String }, // Change from Number to String
    parking_zone_id: { type: String },
    parking_space_id: { type: String },
    booking_date_time: { type: Date },
    release_date_time: { type: Date },
    vehicle_no: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "vehicleparkings",
  VehicleParkings,
  "vehicleparkings"
);
