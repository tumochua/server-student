require("dotenv").config();
const socketio = require("socket.io");

function SocketIo(server) {
  const io = socketio(server, {
    cors: {
      origin: process.env.REACTJS_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  return io;
}

module.exports = SocketIo;
