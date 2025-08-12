// src/auth/authUtils.js

"use strict";

const JWT = require("jsonwebtoken");
const { asyncHandler } = require("../helpers/asyncHandler"); // Giả sử bạn có helper này
const KeyTokenService = require("../services/keyToken.service"); // Sửa 1: Import service thay vì model
const { AuthFailureError, NotFoundError } = require("../core/error.response");

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
  CLIENT_ID: 'x-client-id',
  REFRESH_TOKEN: 'x-refresh-token'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    // Verify access token
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`error verify::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error creating token pair:", error);
    return null;
  }
};

// const authentication = asyncHandler(async (req, res, next) => {
//   /*
//     1. Check userId có trong header không
//     2. Lấy accessToken từ header
//     3. Tìm keyStore dựa trên userId
//     4. Xác thực accessToken
//     5. Nếu hợp lệ, gán keyStore và user vào request và gọi next()
//   */

//   // 1.
//   const userId = req.headers[HEADER.CLIENT_ID];
//   if (!userId) {
//     throw new AuthFailureError('Invalid Request: Missing Client ID');
//   }

//   // 2.
//   const keyStore = await KeyTokenService.findByUserId(userId);
//   if (!keyStore) {
//     throw new NotFoundError('Keystore not found');
//   }

//   // 3.
//   const authHeader = req.headers[HEADER.AUTHORIZATION];
//   if (!authHeader) {
//     throw new AuthFailureError('Invalid Request: Missing Authorization header');
//   }
  
//   // Sửa 4: Tách token từ chuỗi "Bearer <token>"
//   const bearerToken = authHeader.split(' ')[1];
//   if (!bearerToken) {
//     throw new AuthFailureError('Invalid Request: Malformed token');
//   }
  
//   // 4.
//   try {
//     const decodedUser = JWT.verify(bearerToken, keyStore.publicKey);

//     if (decodedUser.userId !== userId) {
//       throw new AuthFailureError('Invalid User');
//     }
    
//     req.keyStore = keyStore;
//     req.user = decodedUser;
    
//     // Sửa 2: Gọi next() khi xác thực thành công
//     return next();
//   } catch (error) {
//     // Sửa 3: Ném lại lỗi gốc để asyncHandler xử lý
//     throw new AuthFailureError(error.message || 'Invalid Token'
//     );
//   }
// });

// Authentication v2 

const authentication = asyncHandler( async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) {
    throw new AuthFailureError('Invalid Request: Missing Client ID');
  }

  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) {
    throw new NotFoundError('Keystore not found');
  }

  if (req.headers[HEADER.REFRESH_TOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
      const decodedUser = await verifyJWT(refreshToken, keyStore.privateKey);
      if (!decodedUser || !decodedUser.userId) {
        throw new AuthFailureError('Invalid Token: No userId found');
      }
      if (decodedUser.userId !== userId) {
        throw new AuthFailureError('Invalid User');
      }
      // req.keyStore = keyStore;
      // req.user = decodedUser;
      return next();
    } catch (error) {
      throw new AuthFailureError(error.message || 'Invalid Token');
    }
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new AuthFailureError('Invalid Request: Missing Authorization header');
  }
  
  try {
    const bearerToken = accessToken.split(' ')[1];
    if (!bearerToken) {
      throw new AuthFailureError('Invalid Request: Malformed token');
    }
    const decodedUser = await verifyJWT(bearerToken, keyStore.publicKey);
    if (!decodedUser || !decodedUser.userId) {
      throw new AuthFailureError('Invalid Token: No userId found');
    }
    req.keyStore = keyStore;
    req.user = decodedUser; // userId and email
    if (decodedUser.userId !== userId) {
      throw new AuthFailureError('Invalid User');
    }
    return next(); // Sửa: Thêm next() để tiếp tục middleware chain
  } catch (error) {
    throw new AuthFailureError(error.message || 'Invalid Token');
  }
});


const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
}


module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
};
