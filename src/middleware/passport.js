require("dotenv").config();
import passport from "passport";
import GooglePlusTokenStrategy from "passport-google-plus-token";
import FacebookTokenStrategy from "passport-facebook-token";
import db from "../models";
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.CLIENTID_GOOGLE,
      clientSecret: process.env.CLIENTSECET_GOOGLE,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("accessToken ", accessToken);
        // console.log("refreshToken ", refreshToken);
        // console.log("profile ", profile);
        if (profile) {
          const findUser = await db.User.findOne({
            where: {
              authGoogleID: profile.id,
              authType: "google",
            },
          });
          if (findUser) return done(null, findUser);
          const newUser = await db.User.create({
            authType: "google",
            authGoogleID: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
          });
          done(null, newUser);
        }
      } catch (error) {
        console.log(error);
        done(error, false);
      }
    }
  )
);
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.CLIENTID_FACEBOOK,
      clientSecret: process.env.CLIENTSECET_FACEBOOK,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("accessToken ", accessToken);
        // console.log("refreshToken ", refreshToken);
        // console.log("profile ", profile.emails[0].value);
        if (profile) {
          const findUser = await db.User.findOne({
            where: {
              authFacebookID: profile.id,
              authType: "facebook",
            },
          });
          // console.log("findUser", findUser);
          if (findUser) return done(null, findUser);
          const newUser = await db.User.create({
            authType: "facebook",
            authFacebookID: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
          });
          done(null, newUser);
        }
      } catch (error) {
        // console.log(error);
        done(error, false);
      }
    }
  )
);
