"use strict";

const AccessService = require("../services/access.service");
const {} = require("../middlewares/errorHandler"); // Assuming you have an error handler middleware
const {} = require('../core/error.response');
const { Created, SuccessResponse } = require("../core/success.response");

class AccessController {

  logIn = async (req, res, next) => {
    const result = await AccessService.logIn(req.body);
    new SuccessResponse({
      message: "Login successful",
      metadata: result.metadata
    }).send(res);
  }

  signUp = async (req, res, next) => {
    // try {
    //   const result = await AccessService.signup(req.body);
    //   return res.status(result.status).json(result);
    // } catch (error) {
    //   next(error);
    // }
    new Created({ message: "User created successfully", metadata: await AccessService.signup(req.body) }).send(res);
  }
}

module.exports = new AccessController();
