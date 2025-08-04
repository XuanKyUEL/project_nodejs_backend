'use strict';

const {model, Schema, Types} = require("mongoose");

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "Apikeys";

// Declare the Schema of the MongoDB model
const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true, // Default status is active
    },
    permissions: {
        type: [String],
        required: true,
        enum: ["READ", "WRITE", "DELETE"], // Define the permissions available
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true, // Automatically manage createdAt and updatedAt fields

});

// Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);
