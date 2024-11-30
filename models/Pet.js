const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["dog", "cat", "bird", "other"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center", // Relación con el modelo de centros
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
