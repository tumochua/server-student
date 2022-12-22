import {
  profileService,
  handleUpdateService,
  handleGetListStudentService,
  handleServiceCreateFamily,
} from "../services/profileService";

const handleGetProfileUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    // const userIdQuery = +req.query.userId;
    const data = await profileService(userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handleEditUser = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await handleUpdateService(req.body, userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handleApiGetListStudentOfClass = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log("userId", userId);
    const className = req.query.className;
    const data = await handleGetListStudentService(className);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handleCreateFamily = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = req.body;
    // console.log("userId", userId);
    // const className = req.query.className;
    const data = await handleServiceCreateFamily(userId, userData);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

module.exports = {
  handleGetProfileUser,
  handleEditUser,
  handleApiGetListStudentOfClass,
  handleCreateFamily,
};
