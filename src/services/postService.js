import db from "../models/index";

const handleServiceCreatePost = (posts, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("userId", userId);
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
      const posts = await db.Post.findOne({
        where: {
          id: postId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.User,
            as: "userData",
            attributes: ["id", "fullName", "image"],
          },
          {
            model: db.Like,
            as: "likeData",
            attributes: ["id", "size"],
          },
        ],
        raw: false,
        nest: true,
      });
      // console.log("post", post.userData.image);
      const postsCopy = JSON.parse(JSON.stringify(posts));
      // console.log("postsCopy", postsCopy);
      if (postsCopy.userData.image) {
        const base64 = await Buffer.from(
          postsCopy.userData.image,
          "base64"
        ).toString("binary");
        postsCopy.userData.image = base64;
      }
      resolve({
        statusCode: 2,
        post: postsCopy,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleServiceLikePost = (data, dataUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postData = await db.Post.findOne({
        where: {
          id: data.postId,
        },
        attributes: ["id", "likeId", "title"],
        include: [
          // {
          //   model: db.User,
          //   as: "userData",
          //   attributes: ["id", "fullName"],
          // },
          {
            model: db.Like,
            as: "likeData",
            attributes: ["id", "postId", "size", "userId"],
          },
        ],
        raw: false,
        nest: true,
      });
      const postsCopy = JSON.parse(JSON.stringify(postData));

      if (postsCopy) {
        postData.likeId = postsCopy.id;
        await postData.save();
        // resolve();
      }
      if (postsCopy && postsCopy.likeData.length === 0) {
        await db.Like.create({
          userId: dataUserId,
          postId: postsCopy.id,
          status: true,
          size: +1,
          time: new Date().getTime(),
        });
        resolve("like");
      } else {
        // console.log("postsCopy", postsCopy);
        // console.log("dataUserId", dataUserId);
        let isLike = false;
        postsCopy.likeData.forEach(async (element) => {
          if (
            dataUserId === element.userId &&
            postsCopy.likeId === element.postId
          ) {
            isLike = true;
            // size += element.size;
          }
        });
        if (isLike) {
          await db.Like.destroy({
            where: {
              postId: postsCopy.likeId,
              userId: dataUserId,
            },
          });
          resolve("delete");
        } else {
          await db.Like.create({
            userId: dataUserId,
            postId: postsCopy.id,
            status: true,
            size: +1,
            time: new Date().getTime(),
          });
          resolve("like");
        }
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
  // handleServiceQuitLikePosts,
};
