const { Server } = require("socket.io");
const chatHandlers = require("./chat/chat.handlers");
const locationHandlers = require("./location/location.handlers");
const notificationsHandlers = require("./notifications/notifications.handlers");

function configureSocket(server) {
  const io = new Server(server, {
    // Cambiar por tu dominio en producción
    cors: { origin: "*" },
  });

  // Registrar manejadores
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Manejadores por funcionalidad
    chatHandlers(socket, io);
    locationHandlers(socket, io);
    notificationsHandlers(socket, io);

    // Desconexión
    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
}

module.exports = { configureSocket };
