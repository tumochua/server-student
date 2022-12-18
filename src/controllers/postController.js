import {
  handleServiceCreatePost,
  handleServiceGetListPosts,
  handeServiceDetailPost,
  handleServiceLikePost,
  handleServiceQuitLikePosts,
  handleServiceSearchPosts,
  handleServiceGetAllPostsByUser,
} from "../services/postService";

const handleCreatePost = async (req, res) => {
  try {
    const userId = req.userId;
    const post = req.body;
    // const userIdQuery = +req.query.userId;
    const data = await handleServiceCreatePost(post, userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handleGetListPosts = async (req, res) => {
  try {
    const currentPage = +req.query.page;
    const data = await handleServiceGetListPosts(currentPage);
    // console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handeDetailPost = async (req, res) => {
  try {
    // console.log(req.query);
    // const userId = req.userId;
    const postId = req.query;
    const data = await handeServiceDetailPost(postId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handleLikePost = async (req, res) => {
  try {
    const reqData = req.body;
    const userId = req.userId;
    const data = await handleServiceLikePost(reqData, userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handleQuitLikePost = async (req, res) => {
  try {
    const reqData = req.body;
    const data = await handleServiceQuitLikePosts(reqData);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handleSearchPosts = async (req, res) => {
  try {
    // console.log(req.query);
    const searchValue = req.query;
    // const currentPage = +req.query.page;
    const data = await handleServiceSearchPosts(searchValue);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

const handleGetAllPostsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await handleServiceGetAllPostsByUser(userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error.message);
  }
};

module.exports = {
  handleCreatePost,
  handleGetListPosts,
  handeDetailPost,
  handleLikePost,
  handleQuitLikePost,
  handleSearchPosts,
  handleGetAllPostsByUser,
};
