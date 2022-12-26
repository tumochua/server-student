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
const useCreateNotificationPosts = (notification, socket) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(notification);
      const { postsId } = notification;
      const notificationData = await db.Notification.findOne({
        where: {
          postsId: postsId,
        },
      });
      if (!notificationData) {
        await db.Notification.create({
          userId: notification.userId,
          userName: notification.userName,
          // statusId: notification.statusId,
          postsId: notification.postsId,
          roleId: notification.roleId,
          description: notification.description,
          title: notification.title,
          image: notification.image,
        });
        socket.broadcast.emit("resCreateMesPosts", notification);
        resolve("ok");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const useApproveNotificationPosts = (notification, socket) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { postsId, statusId } = notification;
      const notificationData = await db.Notification.findOne({
        where: {
          postsId: postsId,
        },
        attributes: [
          "id",
          "userId",
          "userName",
          "statusId",
          "postsId",
          "roleId",
          "description",
        ],
        include: [
          {
            model: db.AllCode,
            as: "statusNotification",
            attributes: ["id", "keyMap", "valueVi", "valueEn"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (notificationData) {
        const statusData = notificationData.statusId;
        // console.log(statusData);
        if (statusData === "T0") {
          await db.Notification.create({
            userId: notification.userId,
            userName: notification.userName,
            statusId: notification.statusId,
            postsId: notification.postsId,
            roleId: notification.roleId,
            description: notification.description,
          });
          socket.broadcast.emit("resApprovedPosts", notification);
          resolve("ok");
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// const useApproveNotificationPosts = (postsId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // const postsId = req.query.postsId;
//       const notificationData = await db.Notification.findOne({
//         where: {
//           postsId: postsId,
//         },
//         attributes: [
//           "id",
//           "userId",
//           "userName",
//           "statusId",
//           "postsId",
//           "roleId",
//           "description",
//         ],
//         include: [
//           {
//             model: db.AllCode,
//             as: "statusNotification",
//             attributes: ["id", "keyMap", "valueVi", "valueEn"],
//           },
//         ],
//         raw: true,
//         nest: true,
//       });
//       resolve({
//         data: notificationData,
//       });
//       // console.log(notificationData);
//       // if (notificationData) {
//       //   const statusId = notificationData.statusId;
//       //   const statusData = await db.Status.findOne({
//       //     where: {
//       //       keyMap: statusId,
//       //     },
//       //   });
//       //   console.log(statusData);
//       //   resolve({
//       //     notificationData,
//       //   });
//       // }
//     } catch (error) {
//       console.log(error);
//       reject(error);
//     }
//   });
// };

module.exports = {
  useCheckErrorToken,
  useCheckRoles,
  useCreateNotificationPosts,
  useApproveNotificationPosts,
};

// const { postsId } = notification;
// // console.log(postsId);
// if (!postsId) {
//   await db.Notification.create({
//     userId: notification.userId,
//     userName: notification.userName,
//     statusId: notification.statusId,
//     postsId: notification.postsId,
//     role: notification.roleId,
//     description: notification.description,
//   });
// } else {
//   const notificationData = await db.Notification.findOne({
//     where: {
//       postsId: postsId,
//     },
//     attributes: [
//       "id",
//       "userId",
//       "userName",
//       "statusId",
//       "postsId",
//       "role",
//       "description",
//     ],
//     raw: true,
//     nest: true,
//   });
//   console.log(notificationData);
// }
