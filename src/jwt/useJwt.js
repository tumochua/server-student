require("dotenv").config();

import JWT from "jsonwebtoken";
import createHttpError from "http-errors";
// import client from "../helpers/connection-redis";
const client = require("../helpers/connection-redis");

const useAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      if (userId) {
        const payload = { userId };
        const secret = process.env.ACCSES_TOKEN;
        const options = {
          expiresIn: "60s",
        };
        const token = JWT.sign(payload, secret, options);
        resolve(token);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
// const useVerifyAccessToken = (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const token = req.cookies.accessToken;
//       if (!token) {
//         res.send("token incorrect");
//       } else {
//         if (token) {
//           try {
//             const verify = JWT.verify(token, process.env.ACCSES_TOKEN);
//             req.userId = verify.userId;
//             next();
//           } catch (error) {
//             resolve(error.message);
//             console.log(error);
//           }
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };
// try {
//   const verify = JWT.verify(token, process.env.ACCSES_TOKEN);
//   console.log("verify", verify);
//   const userId = verify.userId;
//   resolve(userId);
// }catch (error) {
// // console.log(error);
// resolve(error.message);
// };

const useVerifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      try {
        const verify = JWT.verify(token, process.env.ACCSES_TOKEN);
        const userId = verify.userId;
        resolve(userId);
      } catch (error) {
        resolve(error.message);
      }
    }
  });
};

const useRefreshToken = (userId) => {
  // console.log("userId", userId);
  return new Promise(async (resolve, reject) => {
    try {
      if (userId) {
        const payload = { userId };
        // console.log("payload", payload);
        const secret = process.env.REFRESH_TOKEN;
        const options = {
          expiresIn: "60d",
        };
        const token = JWT.sign(payload, secret, options);
        if (token) {
          // client.set("token", "tumochua", { EX: 20 });

          client.set(
            userId.toString(),
            token,
            { EX: 60 * 24 * 60 * 60 },
            (error, result) => {
              if (error) {
                reject(error);
              }
            }
          );

          resolve(token);
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const userVervifyRefreshToken = (refrestoken) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (refrestoken) {
        const secret = process.env.REFRESH_TOKEN;
        const vervifyRefreshToken = JWT.verify(refrestoken, secret);
        const userId = vervifyRefreshToken.userId;
        const data = await client.get(`${userId}`);
        // console.log(data);
        // console.log(refrestoken);
        if (refrestoken === data) {
          return resolve(vervifyRefreshToken);
        } else {
          return resolve("Token Invalid");
        }
      }
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = {
  useAccessToken,
  useVerifyAccessToken,
  useRefreshToken,
  userVervifyRefreshToken,
};
