'use strict';

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const { findById } = require('../services/apikey.service');
const { ForbiddenError } = require('../core/error.response');

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        
        if (!key) {
            throw new ForbiddenError('Forbidden - Missing API Key');
        }
        // Check if key exists in database
        const objKey = await findById(key);
        if (!objKey) {
            throw new ForbiddenError('Forbidden - Invalid API Key');
        }
        
        // Store the API key object for later use
        req.objKey = objKey;
        return next();

    } catch (error) {
        return next(error);
    }
}

const permission = (permission) =>{
    return (req, res, next) => {
        if(!req.objKey.permissions || !req.objKey.permissions.includes(permission)) {
            throw new ForbiddenError('Permission Denied');
        }
        return next();
    }
}


module.exports = {
    apiKey,
    HEADER,
    permission,
}
