import express from "express";
import homeController from "../controllers/homeController";
import auth from "../controllers/authController.js";
import { useVerifyAccessToken } from "../jwt/useJwt";
import { useMiddlewarekAccessToken } from "../middleware/index";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get(
    "/api-get-list-users",
    useMiddlewarekAccessToken,
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

  return app.use("/", router);
};

module.exports = initWebRoutes;
