import express from "express";
import homeController from "../controllers/homeController";
import auth from "../controllers/authController.js";
import {
  useCheckErrorToken,
  useCheckRoles,
  useCreateNotificationPost,
  useApproveNotificationPosts,
} from "../middleware/index";
import {
  handleGetProfileUser,
  handleEditUser,
  handleApiGetListStudentOfClass,
  handleCreateFamily,
} from "../controllers/profileController";
import {
  handleCreatePost,
  handleGetListPosts,
  handeDetailPost,
  handleLikePost,
  handleSearchPosts,
  handleGetAllPostsByUser,
  handleDeletePosts,
  handleEditPosts,
  handleVerifyPosts,
  handleConfirmPosts,
} from "../controllers/postController";

import {
  handleGetListNotification,
  handleCleanNotification,
  handleSeeAllNotification,
} from "../controllers/notificationController";

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
  router.put("/api-edit-user", useCheckErrorToken, handleEditUser);
  router.get(
    "/api-list-students-of-class",
    useCheckErrorToken,
    handleApiGetListStudentOfClass
  );
  router.post("/api-create-family", useCheckErrorToken, handleCreateFamily);

  router.post("/api-create-post", useCheckErrorToken, handleCreatePost);
  router.get("/api-get-list-posts", useCheckErrorToken, handleGetListPosts);
  router.get("/api-get-detail-post-by-id", useCheckErrorToken, handeDetailPost);
  router.put("/api-like-post", useCheckErrorToken, handleLikePost);
  router.get("/api-search-posts", useCheckErrorToken, handleSearchPosts);
  router.get(
    "/api-get-all-posts-by-user",
    useCheckErrorToken,
    handleGetAllPostsByUser
  );
  router.delete("/api-delete-posts", useCheckErrorToken, handleDeletePosts);
  router.put("/api-edit-posts-by-user", useCheckErrorToken, handleEditPosts);
  router.get("/api-get-verify-posts", useCheckErrorToken, handleVerifyPosts);
  router.put("/api-confirm-posts", useCheckErrorToken, handleConfirmPosts);

  // router.delete("/api-quit-like-post", useCheckErrorToken, handleQuitLikePost);

  //// Notification
  router.get(
    "/api-list-notification",
    useCheckErrorToken,
    handleGetListNotification
  );
  router.put(
    "/api-clean-notification",
    useCheckErrorToken,
    handleCleanNotification
  );
  router.get(
    "/api-list-see-all-notification",
    useCheckErrorToken,
    handleSeeAllNotification
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
