require("dotenv").config();
import express from "express";
const app = express();
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import createErrors from "http-errors";
// const client = require("./helpers/connection-redis");
// client.set("token", "abc");
// client.get("token", function (eror, result) {
//   if (eror) {
//     console.log(eror);
//   }
//   console.log(result);
// });
app.use(
  cors({
    origin: process.env.REACTJS_URL,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

app.use((req, res, next) => {
  next(createErrors.NotFound("This route does not exits"));
});

app.use((eror, req, res, next) => {
  res.json({
    status: eror.status || 500,
    message: eror.message,
  });
});

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("backend nodejs in runing on the port" + port);
});
