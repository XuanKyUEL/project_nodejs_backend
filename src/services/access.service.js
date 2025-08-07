"use strict";

const shopModels = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response");
const { verifyJWT } = require("../auth/authUtils");
const { findByEmail } = require("./shop.service");
const keytokenModel = require("../models/keytoken.model");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {


  static signup = async ({ name, email, password }) => {
      try {
        const holderShop = await shopModels.findOne({ email }).lean();
        if (holderShop) {
          throw new BadRequestError('ERROR: Shop\'s Email already exists');
        }
      } catch (error) {
        throw new BadRequestError('ERROR: Shop\'s Email already exists');
      }
      // Perform signup logic here
      const holderShop = await shopModels.findOne({ email }).lean(); // Lean returns a plain JavaScript object instead of a Mongoose document
      if (holderShop) {
        throw new BadRequestError('ERROR: Shop\'s Email already exists');
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
            shop: getInfoData(["_id", "name", "email"], newShop),
            tokens,
          },
        };
      }
      return {
        code: "xxx",
        message: "Error creating shop",
        status: 500,
      };
  };

  static logIn = async ({ email, password }) => {
    try {
      // 1. Check if email exists
      const foundShop = await shopModels.findOne({ email }).lean();
      if (!foundShop) {
        throw new BadRequestError('Shop not registered');
      }

      // 2. Match password
      const match = await bcrypt.compare(password, foundShop.password);
      if (!match) {
        throw new AuthFailureError('Authentication failed');
      }

      // 3. Create Access Token & Refresh Token and save
      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      });

      // 4. Generate tokens
      const tokens = await createTokenPair(
        { userId: foundShop._id, email: foundShop.email },
        publicKey,
        privateKey
      );

      await KeyTokenService.createKeyToken({
        userId: foundShop._id,
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken,
      });

      return {
        metadata: {
          shop: getInfoData(["_id", "name", "email"], foundShop),
          tokens,
        },
      };
    } catch (error) {
      throw error;
    }
  };

  static logOut = async ( keyStore) => {
    try {
      const delKey = await KeyTokenService.removeKeyById(keyStore._id);
      console.log({ message: "Key removed successfully", delKey });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  /**
   * Check if the refresh token is used
   */
  static handlerRefreshToken = async (refreshToken) => {
    // 1. Check if this refresh token has been used before
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken);
    if (foundToken) {
      // Decode the refresh token to get userId
      const { userId, email } = await verifyJWT(refreshToken, foundToken.privateKey);
      console.log(`Refresh token used by userId: ${userId}, email: ${email}`);
      // Delete the key by userId
      const deletedKey = await KeyTokenService.deleteKeyById(userId);
      console.log(`Deleted key for userId: ${userId}`, deletedKey);
      throw new ForbiddenError('Refresh token has been used. Please login again.');
    }

    // 2. Check if refresh token exists in current tokens
    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) {
      throw new AuthFailureError('Invalid refresh token');
    }

    // 3. Verify the refresh token
      const { userId, email } = await verifyJWT(refreshToken, holderToken.privateKey);
      console.log(`Refresh token valid for userId: ${userId}, email: ${email}`);

    // 4. Find user and check if user still exists
    const foundShop = await findByEmail(email);
    if (!foundShop) {
      throw new AuthFailureError('Shop not found');
    }
    // 5. Create new token pair
    const tokens = await createTokenPair(
      { userId: foundShop._id, email: foundShop.email },
      holderToken.publicKey,
      holderToken.privateKey
    );
    
    if (!tokens) {
      throw new BadRequestError('Error creating new tokens');
    }

    // 6. Update the refresh token in the key store
    await KeyTokenService.updateRefreshToken(holderToken._id, refreshToken, tokens.refreshToken);

    return {
      user: getInfoData(["_id", "name", "email"], foundShop),
      tokens,
    };
  }
}

module.exports = AccessService;
