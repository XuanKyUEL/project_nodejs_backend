"use strict";

const {
    StatusCode, ReasonStatusCode
} = require('../utils/httpStatusCode');

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message); // Call the parent constructor with the error message
        this.statusCode = statusCode;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
  constructor(message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
    super(message, statusCode);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
    super(message, statusCode);
  }
}

const NotFoundError = class extends ErrorResponse {
  constructor(message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
    super(message, statusCode);
  }
}

// const InternalServerError = class extends ErrorResponse {
//   constructor(message = ReasonStatusCode.INTERNAL_SERVER_ERROR, statusCode = StatusCode.INTERNAL_SERVER_ERROR) {
//     super(message, statusCode);
//   }
// }

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    ForbiddenError,
    NotFoundError,
    // InternalServerError
};
