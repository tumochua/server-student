import db from "../models";
import { userfindOneUser } from "../use/hooks";

const profileService = async (userId) => {
  try {
    // const relationship = false;
    const user = await userfindOneUser(userId);
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  profileService,
};
