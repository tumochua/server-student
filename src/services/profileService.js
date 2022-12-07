import db from "../models";
import { userfindOneUser, userCheckEmail } from "../use/hooks";

const profileService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
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
        ],
        raw: true,
        nest: true,
      });
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

module.exports = {
  profileService,
  handleUpdateService,
};
