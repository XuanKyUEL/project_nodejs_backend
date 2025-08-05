"use strict";

const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      const result = await AccessService.signup(req.body);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccessController();
