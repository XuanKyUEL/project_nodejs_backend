"use strict";

const mongoose = require("mongoose");

const {
  db: { host, name, port },
} = require("../configs/config.mongodb");
console.log(`Connecting to MongoDB at ${host}:${port}/${name}`);
const connectString = `mongodb://${host}:${port}/${name}`;
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
      .connect(connectString, {
        maxPoolSize: 50, // Set max pool size to 50
      })
      .then((_) => {
        console.log("Connected to MongoDB successfully at", connectString);
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
