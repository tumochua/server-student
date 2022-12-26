import {
  handleServiceGetListNotification,
  handleServiceCleanNotification,
} from "../services/notificationServices";
const handleGetListNotification = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await handleServiceGetListNotification(userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handleCleanNotification = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await handleServiceCleanNotification(userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

module.exports = {
  handleGetListNotification,
  handleCleanNotification,
};
