module.exports = (socket, io) => {
  socket.on("sendNotification", (notification) => {
    console.log("Notificación recibida:", notification);
    io.emit("receiveNotification", notification);
  });
};
