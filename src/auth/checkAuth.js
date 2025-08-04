'use strict'

const { findById } = require("../services/apikey.service");

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization"
}

const apiKey = async (req, res, next) => {
    // Middleware to check API Key
    try {
        // Check key
        const key = req.headers[HEADER.API_KEY];
        if (!key) {
            return res.json({
                message: 'Forbidden' ,
                status: 403
            })
        }
        // Check if key exists in database
        const objKey = await findById(key);
        if (!objKey) {
            return res.json({
                message: 'Forbidden',
                status: 403
            });
        }
        
        // Store the API key object for later use
        req.objKey = objKey;
        return next();

    } catch (error) {
        return res.json({
            message: 'Internal Server Error',
            status: 500
        });
    }
}

const permission = (permission) =>{
    return (req, res, next) => {
        if(!req.objKey.permissions || !req.objKey.permissions.includes(permission)) {
            return res.json({
                message: 'Permission Denied',
                status: 403
            });
        }
        return next();
    }
}

module.exports = {
    apiKey,
    HEADER,
    permission
}
