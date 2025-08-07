"use strict";

const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true };

      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.error("Error creating key token:", error);
      return null;
    }
  };

  static findByUserId = async (userId) => {
    // Đã sửa: không cần new Types.ObjectId, thêm .lean() để tối ưu
    return await keyTokenModel.findOne({ user: userId }).lean();
  };

  static removeKeyById = async (id) => {
    // Hàm này nhận vào _id của document, không phải userId
    return await keyTokenModel.deleteOne({ _id: id });
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken });
  };

  static deleteKeyById = async (userId) => {
    // Đã sửa: không cần new Types.ObjectId
    return await keyTokenModel.deleteOne({ user: userId });
  };

  static updateRefreshToken = async (keyTokenId, oldRefreshToken, newRefreshToken) => {
    return await keyTokenModel.findByIdAndUpdate(
      keyTokenId,
      {
        $set: { refreshToken: newRefreshToken },
        $addToSet: { refreshTokensUsed: oldRefreshToken }
      },
      { new: true }
    );
  };
}

module.exports = KeyTokenService;
