const handleAuth2Google = (req, res, next) => {
  // console.log("google auth ", req.user);
  return res.status(200).json({ status: "ok" });
};
const handleAuth2Facebook = (req, res, next) => {
  // console.log("facebook auth ", req.user);
  return res.status(200).json({ status: "ok" });
};
module.exports = {
  handleAuth2Google,
  handleAuth2Facebook,
};
