module.exports = (socket, io) => {
  socket.on("chatMessage", (message) => {
    console.log("Mensaje recibido:", message);
    io.emit("chatMessage", message); // Reenviar mensaje a todos los clientes
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Cliente ${socket.id} se unió a la sala ${room}`);
    io.to(room).emit("notification", `${socket.id} se unió a la sala`);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`Cliente ${socket.id} salió de la sala ${room}`);
    io.to(room).emit("notification", `${socket.id} salió de la sala`);
  });
};
