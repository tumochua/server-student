import createError from "http-errors";
import {
  handleRegisterService,
  handleLoginService,
  handleRefreshTokenService,
  handleLogoutService,
} from "../services/authServices";
const handleRegister = async (req, res, next) => {
  try {
    const data = await handleRegisterService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    createError.InternalServerError();
    next(error);
  }
};

const hanldeLogin = async (req, res, next) => {
  try {
    const data = await handleLoginService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const handleRefreshToken = async (req, res, next) => {
  try {
    const data = await handleRefreshTokenService(req.headers);
    // console.log("data", data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handeLogout = async (req, res, next) => {
  try {
    const data = await handleLogoutService(req.headers);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

module.exports = {
  handleRegister,
  handleRefreshToken,
  hanldeLogin,
  handeLogout,
};
