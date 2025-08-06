"use strict";

// const StatusCode = {
//     FORBIDDEN: 403,
//     NOT_FOUND: 404,
//     CONFLICT: 409,
//     BAD_REQUEST: 400,
//     UNAUTHORIZED: 401,
// }

// const ReasonStatusCode = {
//     FORBIDDEN: 'Bad request error',
//     NOT_FOUND: 'Not found error',
//     CONFLICT: 'Conflict error',
//     BAD_REQUEST: 'Bad request error',
//     UNAUTHORIZED: 'Unauthorized error',
// }

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

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    ForbiddenError
}
