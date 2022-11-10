import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/home", homeController.getHomePage);
  router.get("/get-list-users", homeController.handleGetlistUsers);

  return app.use("/", router);
};

module.exports = initWebRoutes;
