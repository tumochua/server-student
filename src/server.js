require("dotenv").config();
import express from "express";
const http = require("http");
const app = express();
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import createErrors from "http-errors";
import cookieParser from "cookie-parser";
const socketio = require("socket.io");

const server = http.createServer(app);
app.use(
  cors({
    origin: process.env.REACTJS_URL,
    credentials: true,
  })
);
const io = socketio(server, {
  cors: {
    origin: process.env.REACTJS_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.set("socketio", io);

// io.on("connection", (socket) => {
//   // console.log("User has connection!!");
//   socket.on("postsNotification", (arg) => {
//     // console.log(arg);
//     socket.broadcast.emit("notification", arg);
//   });
// });
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

server.listen(port, () => {
  console.log("backend nodejs in runing on the port" + port);
});
