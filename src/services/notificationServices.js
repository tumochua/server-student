const handleServiceNotification = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      resolve("tumochua");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleServiceNotification,
};
