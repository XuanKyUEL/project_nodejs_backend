'use strict';

const express = require('express');
const router = express.Router();
const { createApiKey } = require('../../services/apikey.service');

// POST /v1/api/apikey - Create a new API key (for testing)
router.post('/', async (req, res) => {
    try {
        const newApiKey = await createApiKey();
        res.status(201).json({
            message: 'API Key created successfully',
            data: {
                key: newApiKey.key,
                permissions: newApiKey.permissions,
                status: newApiKey.status,
                id: newApiKey._id
            }
        });
    } catch (error) {
        console.error('Error creating API key:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

module.exports = router;
