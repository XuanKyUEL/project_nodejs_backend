'use strict';

const apikeyModel = require("../models/apikey.model");
const crypto = require("crypto");

const findById = async (key) => {
    // Just find the existing API key by the provided key
    const objectKey = await apikeyModel.findOne({ key, status: true }).lean();
    return objectKey;
};

const createApiKey = async () => {
    // Create a new API key with random key
    const newKey = await apikeyModel.create({ 
        key: crypto.randomBytes(32).toString("hex"), 
        permissions: ["READ", "WRITE"] 
    });
    console.log("New API Key created:", newKey);
    return newKey;
};

module.exports = {
    findById,
    createApiKey
};
