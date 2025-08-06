'use strict'

const shopModels = require("../models/shop.models")

const findByEmail = async ({email, select = {
    email: 1, password: 1, role: 1, createdAt: 1, verify: 1, _id: 1, name: 1
}}) => {
    return await shopModels.findOne({ email }, select).lean();
}

module.children = {
    findByEmail
}
