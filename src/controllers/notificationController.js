import { handleServiceNotification } from "../services/notificationServices";
const handleNotification = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await handleServiceNotification(userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

module.exports = {
  handleNotification,
};
