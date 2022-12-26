import db from "../models/index";

const handleServiceGetListNotification = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notificationData = await db.Notification.findAll({
        where: {
          userId: userId,
          // statusId: "T0",
          // statusId: "T1",
          // statusId:'T0'
        },
        attributes: [
          "id",
          "userId",
          "userName",
          "statusId",
          "postsId",
          "readId",
          "roleId",
          "description",
          "title",
        ],
        // include: [
        //   {
        //     model: db.AllCode,
        //     as: "statusNotification",
        //     attributes: ["id", "keyMap", "valueVi", "valueEn"],
        //   },
        //   {
        //     model: db.AllCode,
        //     as: "readData",
        //     attributes: ["id", "keyMap", "valueVi", "valueEn"],
        //   },
        // ],
        raw: true,
        nest: true,
      });

      resolve({
        statusCode: 2,
        data: notificationData,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleServiceCleanNotification = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cleanNotification = await db.Notification.findAll({
        where: {
          userId: userId,
        },
        attributes: ["id", "userId", "readId"],
        raw: false,
        nest: true,
      });
      if (cleanNotification) {
        cleanNotification.forEach(async (element) => {
          element.readId = "D1";
          await element.save();
        });
        resolve({
          statusCode: 2,
          message: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleServiceGetListNotification,
  handleServiceCleanNotification,
};
