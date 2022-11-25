import {
  useAccessToken,
  useVerifyAccessToken,
  userVervifyRefreshToken,
} from "../jwt/useJwt";

const useMiddlewarekAccessToken = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = req.cookies;
      if (token) {
        const accessToken = token.accessToken;
        const refreshToken = token.refreshToken;
        const data = await useVerifyAccessToken(accessToken);
        console.log("data", data);
        if (data === "jwt expired") {
          const tokenRefreshToken = await userVervifyRefreshToken(refreshToken);
          const userId = tokenRefreshToken.userId;
          const newAccessToken = await useAccessToken(userId);
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
          });
          req.userId = userId;
          next();
        } else {
          req.userId = data;
          next();
        }
      } else {
        resolve("token not found");
      }
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
};

const useCheckErrorToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
    }
  });
};

module.exports = {
  useMiddlewarekAccessToken,
};
