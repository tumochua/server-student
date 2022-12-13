import db from "../models/index";

const handleServiceCreatePost = (posts, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //   console.log("userId", userId);
      // console.log("posts", posts);
      const { title, textMarkDown, type, textHtmlMarkDown } = posts;

      if (!title || !textMarkDown || !type) {
        resolve({
          status: 400,
          message: "you are missing a required parameter",
        });
      }

      const user = await db.User.findOne({
        where: {
          id: userId,
        },
      });
      if (user) {
        await db.Post.create({
          userId: userId,
          title: title,
          contentMarkdown: textMarkDown,
          contentHTML: textHtmlMarkDown,
          type: type,
          date: new Date().getTime(),
          // likeId:
        });
        resolve({ statusCode: 2, message: "create post successful" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleServiceGetListPosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await db.Post.findAll({
        attributes: ["id", "title", "date", "userId"],
        include: [
          {
            model: db.User,
            as: "userData",
            attributes: ["id", "fullName", "image"],
          },
        ],
        raw: true,
        nest: true,
      });
      // console.log("posts", posts);
      posts.forEach(async (element) => {
        // console.log("element", element.userData.image);
        const base64 = await Buffer.from(
          element.userData.image,
          "base64"
        ).toString("binary");
        element.userData.image = base64;
      });
      resolve({
        statusCode: 2,
        posts,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handeServiceDetailPost = ({ postId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await db.Post.findOne({
        where: {
          id: postId,
        },
        // attributes: ["id", "userId", "date","title"],
        include: [
          {
            model: db.User,
            as: "userData",
            attributes: ["id", "fullName", "image"],
          },
        ],
        raw: true,
        nest: true,
      });
      const base64 = await Buffer.from(post.userData.image, "base64").toString(
        "binary"
      );
      post.userData.image = base64;
      resolve({
        statusCode: 2,
        post,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleServiceLikePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("data", data);
      const { postId } = data;
      if (postId) {
        const postData = await db.Post.findOne({
          where: {
            id: postId,
          },
          attributes: ["id", "likeId"],
          include: [
            {
              model: db.User,
              as: "userData",
              attributes: ["id", "fullName"],
            },
            // {
            //   model: db.Like,
            //   as: "postsData",
            //   attributes: [
            //     "id",
            //     "postId",
            //     "status",
            //     "size",
            //     "commentId",
            //     "time",
            //   ],
            // },
          ],
          raw: false,
          nest: true,
        });

        if (postData) {
          const userId = postData.userData.id;
          const postId = postData.id;
          postData.likeId = postData.id;
          await postData.save();
          await db.Like.create({
            userId: userId,
            postId: postId,
            status: true,
            size: +1,
            time: new Date().getTime(),
          });
        }
        // const postsCopy = JSON.parse(JSON.stringify(postData));
        // console.log("postsCopy", postsCopy);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleServiceQuitLikePosts = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postsData = await db.Post.findOne({
        where: {
          id: postId.postId,
        },
        attributes: ["id", "likeId"],
      });

      if (postsData) {
        await db.Like.destroy({
          where: {
            postId: postsData.likeId,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleServiceCreatePost,
  handleServiceGetListPosts,
  handeServiceDetailPost,
  handleServiceLikePost,
  handleServiceQuitLikePosts,
};
