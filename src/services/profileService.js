import db from "../models";
import { userfindOneUser, userCheckEmail } from "../use/hooks";

const profileService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      /// findAll
      const data = await db.User.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ["passwordHash"],
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
          {
            model: db.Parents,
            as: "parentData",
            include: [
              {
                model: db.AllCode,
                as: "genderMommyData",
                attributes: ["id", "KeyMap", "valueEn", "valueVi"],
              },
              {
                model: db.AllCode,
                as: "genderFatherData",
                attributes: ["id", "KeyMap", "valueEn", "valueVi"],
              },
            ],
          },
          {
            model: db.Class_Students,
            as: "classData",
            attributes: ["id", "keyMap", "studentId", "className"],
          },
        ],
        raw: true,
        nest: true,
      });
      // console.log("data", data);
      const base64 = await Buffer.from(data.image, "base64").toString("binary");
      data.image = base64;
      resolve({
        statusCode: 2,
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleUpdateService = (data, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { user } = await userfindOneUser(userId);
      if (user) {
        user.fullName = data.userName;
        user.email = data.email;
        user.address = data.address;
        user.image = data.avatar;
        user.dob = data.birthday;

        await user.save();
        resolve({
          statusCode: 2,
          message: "update the user succeeds",
        });
      } else {
        resolve({
          statusCode: 4,
          errMessage: `user's not found`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetListStudentService = (keyMap) => {
  // console.log("className", keyMap);
  return new Promise(async (resolve, reject) => {
    try {
      /// findAll
      const resopnseClass = await db.Class_Students.findAll({
        where: {
          keyMap: keyMap,
        },
        attributes: {
          exclude: ["courseId", "teacherId", "createdAt", "updatedAt"],
        },
        // include: [
        //   {
        //     model: db.User,
        //     as: "classData",
        //     attributes: ["fullName"],
        //   },
        // ],
        // raw: true,
        // nest: true,
      });
      console.log("resopnseClass", resopnseClass);
      // resolve({
      //   statusCode: 2,
      //   resopnseClass,
      // });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  profileService,
  handleUpdateService,
  handleGetListStudentService,
};
