import db from "../models/index";

import {
  useAccessToken,
  useVerifyAccessToken,
  userVervifyRefreshToken,
} from "../jwt/useJwt";

const useCheckErrorToken = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = req.cookies;
      if (token) {
        const accessToken = token.accessToken;
        const refreshToken = token.refreshToken;
        const data = await useVerifyAccessToken(accessToken);
        if (Number.isInteger(data)) {
          req.userId = data;
          return next();
        }
        if (data === "invalid token") {
          res.json({
            statusCode: 403,
            message: "invalid token",
          });
        }
        if (data === "jwt expired") {
          const tokenRefreshToken = await userVervifyRefreshToken(refreshToken);
          // console.log(tokenRefreshToken);
          // console.log(tokenRefreshToken === "invalid token");
          if (tokenRefreshToken === "invalid token") {
            res.json({
              statusCode: 403,
              message: "invalid token",
            });
          }
          const userId = tokenRefreshToken.userId;
          const newAccessToken = await useAccessToken(userId);
          res.cookie("accessToken", newAccessToken, {
            // httpOnly: true,
            // secure: true,
          });
          req.userId = userId;
          return next();
        }
      } else {
        res.json({
          statusCode: 404,
          message: "invalid token",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        statusCode: 500,
        message: "error from serve",
      });
    }
  });
};

const useCheckRoles = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: req.userId,
        },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.AllCode,
            as: "genderData",
            attributes: ["id", "KeyMap", "valueEn", "valueVi"],
          },
          {
            model: db.AllCode,
            as: "roleData",
            attributes: ["id", "KeyMap", "valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      if (user) {
        req.role = user.roleData;
        next();
      }
    } catch (error) {
      console.log(error);
      res.json({
        statusCode: 500,
        message: "error from serve",
      });
    }
  });
};

const useNotification = (req, res, next) => {
  const io = req.app.get("socketio");
  // console.log(io);
  io.socket.on("connection", function (socket) {
    console.log("A user connected");
  });
  // socket.on("postsNotification", (ags) => {
  //   console.log(ags);
  // });
  // socket.broadcast.emit("notification", ags);
  next();
};

module.exports = {
  useCheckErrorToken,
  useCheckRoles,
  useNotification,
};
