require("dotenv").config();
import express from "express";
const app = express();
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import createErrors from "http-errors";
import cookieParser from "cookie-parser";
app.use(
  cors({
    origin: process.env.REACTJS_URL,
    credentials: true,
  })
);

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }, { limit: "50mb" }));

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
