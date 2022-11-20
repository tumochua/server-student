import bcrypt from "bcryptjs";
import createError from "http-errors";

import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

const userCheckEmail = async (email) => {
  try {
    const data = await db.User.findOne({ where: { email: email } });
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const useHasPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};
const useDecodePassword = async (password, hashPassword) => {
  try {
    const decode = await bcrypt.compareSync(password, hashPassword);
    return decode;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userCheckEmail,
  useHasPassword,
  useDecodePassword,
};
