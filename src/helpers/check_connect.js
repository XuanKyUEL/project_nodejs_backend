"use strict";

const _SECONDS = 5000; // 5 seconds
const os = require("os");
const process = require("process");

const mongoose = require("mongoose");
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections}`);
};

// Check overload of connections
const checkOverload = () => {
  // Check monitor in 5s with setInterval
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // Convert to MB
    // Assume maximum connections is 10 times the number of CPU cores
    const maxConnections = numCores * 10;
    console.log(
      `Current connections: ${numConnections}, Max allowed: ${maxConnections}, Memory usage: ${memoryUsage.toFixed(
        2
      )} MB`
    );
    if (numConnections > maxConnections) {
      console.warn(
        `Overload detected! Connections: ${numConnections}, Max allowed: ${maxConnections}`
      );
    } else {
      console.log(
        `Current connections: ${numConnections}, within limit of ${maxConnections}`
      );
    }
  }, _SECONDS);
};

module.exports = { countConnect, checkOverload };
