"use strict";

const mongoose = require("mongoose");

const connectString = "mongodb://localhost:27017/shopDev";
const { countConnect } = require("../helpers/check_connect");
const { checkOverload } = require("../helpers/check_connect");
class Database {
  constructor() {
    this.connect();
  }

  // connect to MongoDB
  connect(type = "mongobd") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => {
        console.log("Connected to MongoDB successfully [PROD]");
        countConnect(); // Log the number of connections
        // checkOverload(); // Start monitoring connection overload
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
