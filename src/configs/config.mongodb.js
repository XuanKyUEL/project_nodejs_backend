"use strict";

const app = require("../app");

// level 0

// const config = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     host: "localhost",
//     port: 27017,
//     name: "shopDev",
//   },
// };

// level 1
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000, // Use environment variable or default to 3000
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "shopDev",
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3000, // Use environment variable or default to 3000
  },
  db: {
    host: process.env.PROD_DB_HOST || "localhost",
    port: process.env.PROD_DB_PORT || 27017,
    name: process.env.PROD_DB_NAME || "shopProd",
  },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev"; // Default to 'dev' if NODE_ENV is not set
module.exports = config[env];
