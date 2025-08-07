"use strict";

const AccessService = require("../services/access.service");
const {} = require("../middlewares/errorHandler"); // Assuming you have an error handler middleware
const {} = require('../core/error.response');
const { Created, SuccessResponse } = require("../core/success.response");

class AccessController {

  handlerRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: "Refresh token successful",
      metadata: await AccessService.handlerRefreshToken(req.body.refreshToken)
    }).send(res);
  }

  logOut = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout successful",
      metadata: await AccessService.logOut({ keyStore: req.keyStore })
    }).send(res);
  }

  logIn = async (req, res, next) => {
    const result = await AccessService.logIn(req.body);
    new SuccessResponse({
      message: "Login successful",
      metadata: result.metadata
    }).send(res);
  }

  signUp = async (req, res, next) => {
    const result = await AccessService.signup(req.body);
    new Created({ message: "User created successfully", metadata: result }).send(res);
  }
}

module.exports = new AccessController();
