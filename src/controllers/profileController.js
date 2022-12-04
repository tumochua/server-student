import { profileService } from "../services/profileService";

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

module.exports = {
  handleGetProfileUser,
};
