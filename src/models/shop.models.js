"use strict";

const { model, Schema, Types } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "shops";

// Declare the Schema of the Mongo model
const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      indexedDB: true, // Ensure email is indexed for faster queries
    },
    password: {
      type: String,
      required: true,
    },
    verify: [
      {
        type: Schema.Types.Boolean,
        enum: ["active", "inactive"],
        default: "inactive",
      },
    ],
    role: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);
