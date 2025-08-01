"use strict";

const shopModels = require("../models/shop.models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signup = async ({ name, email, password }) => {
    try {
      // Perform signup logic here
      const holderShop = await shopModels.findOne({ email }).lean(); // Lean returns a plain JavaScript object instead of a Mongoose document
      if (holderShop) {
        return {
          code: "xxx",
          message: "Email already exists",
          status: 400,
        }; // Return early if email already exists
      }

      const hashedPassword = await bcrypt.hash(password, 12); // Hash the password with a salt rounds of 12

      const newShop = await shopModels.create({
        name,
        email,
        password: hashedPassword,
        role: [RoleShop.SHOP], // Sử dụng 'role' thay vì 'roles' theo schema
      });

      if (newShop) {
        // Create refresh token logic can be added here
        // Create privateKey, publicKey for JWT. `privateKey` should be kept secret, `publicKey` can be shared
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096, // Length of the key in bits
          publicKeyEncoding: {
            type: "pkcs1", // Recommended for public keys
            format: "pem", // PEM format is widely used
          },
          privateKeyEncoding: {
            type: "pkcs8", // Recommended for private keys
            format: "pem", // PEM format is widely used
          },
        });

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
          refreshToken: null, // Will be updated after token creation
        });

        if (!keyStore) {
          return {
            code: "xxx",
            message: "Error creating key token",
            status: 500,
          };
        }

        // Create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email: newShop.email },
          publicKey,
          privateKey
        );
        console.log("Tokens created successfully:", tokens);

        if (!tokens) {
          return {
            code: "xxx",
            message: "Error creating tokens",
            status: 500,
          };
        }

        return {
          code: "201",
          message: "Shop created successfully",
          status: 201,
          metadata: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }
    } catch (error) {
      return {
        code: "xxx",
        message: "An error occurred during signup",
        status: 500,
        error: error.message,
      };
    }
  };
}

module.exports = AccessService;
