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
            attributes: [
              "id",
              "userId",
              "mobile",
              "fullNameFather",
              "fullNameMommy",
            ],
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
      // console.log(data);
      if (data && data.image) {
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
      const userData = await db.User.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ["passwordHash", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Parents,
            as: "parentData",
            attributes: [
              "id",
              "userId",
              "mobile",
              "fullNameFather",
              "fullNameMommy",
            ],
          },
        ],
        raw: false,
        nest: true,
      });
      // console.log(!userData.dataValues.parentData);
      // console.log(data);
      if (userData) {
        userData.fullName = data.userName;
        userData.email = data.email;
        userData.dob = data.birthday;
        userData.image = data.avatar;
        userData.mobile = data.mobile;
        userData.genderId = data.gender;
        userData.classId = data.className;
        userData.address = data.address;
        await userData.save();
        if (!userData.dataValues.parentData) {
          await db.Parents.create({
            userId: userId,
            fullNameFather: data.userDad,
            fullNameMommy: data.userMother,
            mobile: data.mobileContact,
          });
        } else {
          const familyData = await db.Parents.findOne({
            where: {
              userId: userId,
            },
            attributes: [
              "id",
              "userId",
              "mobile",
              "fullNameFather",
              "fullNameMommy",
            ],
            raw: false,
            nest: true,
          });
          if (familyData) {
            (familyData.mobile = data.mobileContact),
              (familyData.fullNameFather = data.userDad),
              (familyData.fullNameMommy = data.userMother);
          }
          await familyData.save();
        }
        resolve({
          statusCode: 2,
          message: "update the user and family succeeds",
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
          // {
          //   // separate: true,
          //   model: db.User,
          //   as: "classData",
          //   attributes: ["id", "fullName", "dob", "classId"],
          //   // separate: true, // <--- Run separate query
          //   // limit: 2,
          // },
        ],
        raw: false,
        nest: true,
      });
      // console.log("resopnseClass", resopnseClass);
      resolve({
        statusCode: 2,
        data: JSON.stringify(resopnseClass),
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleServiceCreateFamily = (userId, userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          statusCode: 4,
          message: "you are missing a required parameter",
        });
      }
      const familyData = await db.Parents.findOne({
        where: {
          userId: userId,
        },
      });
      if (!familyData) {
        await db.Parents.create({
          userId: userId,
          fullNameFather: userData.userDad,
          fullNameMommy: userData.userMother,
          mobile: userData.mobileContact,
        });
        resolve({
          statusCode: 2,
          message: "create family succeeds",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  profileService,
  handleUpdateService,
  handleGetListStudentService,
  handleServiceCreateFamily,
};
