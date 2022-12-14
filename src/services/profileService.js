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
      // console.log("data", data.classId);
      if (data.image) {
        const base64 = await Buffer.from(data.image, "base64").toString(
          "binary"
        );
        data.image = base64;
      }
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

const handleGetListStudentService = (className) => {
  // console.log("className", className);
  return new Promise(async (resolve, reject) => {
    try {
      /// findAll
      const resopnseClass = await db.Class_Students.findOne({
        where: {
          className: className,
        },
        attributes: ["id", "keyMap", "className"],
        include: [
          {
            // separate: true,
            model: db.User,
            as: "classData",
            attributes: ["id", "fullName", "dob", "classId"],
            // separate: true, // <--- Run separate query
            // limit: 2,
          },
        ],
        raw: false,
        nest: true,
      });
      // console.log("resopnseClass", resopnseClass);
      resolve({
        statusCode: 2,
        data: JSON.stringify(resopnseClass),
      });
      // let plainClass = resopnseClass.classData.map((x) =>
      //   x.get({ plain: true })
      // );
      // plainClass = JSON.stringify(plainClass);
      // console.log("plainClass", plainClass);
      // resolve({
      //   statusCode: 2,
      //   data: plainClass,
      // });
      // console.log("resopnseClass", resopnseClass.rows);
      // let plainClass = resopnseClass.map((x) => x.get({ plain: true }));
      // plainClass = JSON.stringify(plainClass);
      // resolve({
      //   statusCode: 2,
      //   data: plainClass,
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
