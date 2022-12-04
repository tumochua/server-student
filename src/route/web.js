import express from "express";
import homeController from "../controllers/homeController";
import auth from "../controllers/authController.js";
import { useVerifyAccessToken } from "../jwt/useJwt";
import { useCheckErrorToken, useCheckRoles } from "../middleware/index";
import { handleGetProfileUser } from "../controllers/profileController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get(
    "/api-get-list-users",
    useCheckErrorToken,
    useCheckRoles,
    homeController.handleGetlistUsers
  );

  router.get("/api-test", homeController.handleTest);

  /// auth
  router.post("/api-register-user", auth.handleRegister);
  router.post("/api-login", auth.hanldeLogin);
  router.post("/api-refresh-token", auth.handleRefreshToken);
  router.delete("/api-logout", auth.handeLogout);
  // router.post("/api-refresh-token", useVerifyAccessToken);
  // router.get("/api-verify-token", useVerifyAccessToken);

  /// profile
  router.get(
    "/api-get-profile-user-by-id",
    useCheckErrorToken,
    handleGetProfileUser
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
