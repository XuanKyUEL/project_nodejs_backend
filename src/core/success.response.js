'use strict';

// const StatusCode = {
//     OK: 200,
//     CREATED: 201,
//     NO_CONTENT: 204,
// }

// const ReasonStatusCode = {
//     OK: 'Success',
//     CREATED: 'Resource created successfully',
// }

const { StatusCode, ReasonStatusCode } = require('../utils/httpStatusCode');

class SuccessResponse {
    constructor( {message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = null} ) {
        this.message = !message ? ReasonStatusCode.OK : message;
        this.statusCode = statusCode;
        this.reasonStatusCode = reasonStatusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        res.status(this.statusCode).json({
            success: true,
            message: this.message,
            reasonStatusCode: this.reasonStatusCode,
            metadata: this.metadata,
            ...headers
        });
    }
}

class OK extends SuccessResponse {
    constructor ({message, metadata}) {
        super({message, metadata})
    }
}

class Created extends SuccessResponse {
    constructor ({message, metadata}) {
        super({message, statusCode: StatusCode.CREATED, reasonStatusCode: ReasonStatusCode.CREATED, metadata})
    }
}

class NoContent extends SuccessResponse {
    constructor ({message}) {
        super({message, statusCode: StatusCode.NO_CONTENT})
    }
}

module.exports = {
    OK, Created, NoContent, SuccessResponse
}
