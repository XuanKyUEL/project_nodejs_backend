"use strict";

const _ = require("lodash");

const getInfoData = (fields = [], object = {}) => {
  // Handle different object types
  let plainObject;
  
  if (object.toObject && typeof object.toObject === 'function') {
    // Mongoose document
    plainObject = object.toObject();
  } else if (object.toJSON && typeof object.toJSON === 'function') {
    // Object with toJSON method
    plainObject = object.toJSON();
  } else {
    // Already a plain object or lean object
    plainObject = object;
  }
  
  return _.pick(plainObject, fields);
};

module.exports = {
  getInfoData,
};
