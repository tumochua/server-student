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
// app.get("/vehicles", (req, res) => {
//   vehicleModel
//     .findAll({
//       attributes: { exclude: ["CustomerId"] },
//       include: {
//         model: CustomerModel,
//         attributes: ["CustomerName", "phoneNo"],
//         right: true,
//       },
//     })
//     .then((data) => {
//       console.log(data);
//       res.status(200).json({
//         status: 1,
//         data: data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         status: 0,
//         message: "there is some error!!" + err,
//       });
//     });
// });
const handleGetListStudentService = (className) => {
  // console.log("className", className);
  return new Promise(async (resolve, reject) => {
    try {
      /// findAll
      const resopnseClass = await db.Class_Students.findAll({
        attributes: ["id", "keyMap", "className"],
        include: {
          model: db.User,
          as: "classData",
          attributes: ["id", "fullName", "classId"],
          // raw: true,
        },
        where: {
          className: className,
        },
        // raw: true,
        raw: false,
        nest: true,
      });
      let plainClass = resopnseClass.map((x) => x.get({ plain: true }));
      plainClass = JSON.stringify(plainClass);
      resolve({
        statusCode: 2,
        data: plainClass,
      });
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
