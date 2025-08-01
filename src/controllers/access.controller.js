"use strict";

const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      //   const { email, password } = req.body;
      //   // Perform signup logic (e.g., create user in database)
      //   res.status(201).json({
      //     message: "User registered successfully",
      //   });
      console.log("[P] SignUp:", req.body);
      // 200 is OK, 201 is Created, 400 is Bad Request, 401 is Unauthorized, 403 is Forbidden, 404 is Not Found, 500 is Internal Server Error
      const result = await AccessService.signup(req.body);
      res.status(result.status).json({
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
