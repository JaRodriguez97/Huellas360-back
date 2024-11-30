module.exports = (socket, io) => {
  socket.on("updateLocation", (location) => {
    console.log("Ubicación recibida:", location);
    io.emit("locationUpdate", location); // Emitir actualización a todos
  });

  socket.on("requestLocation", () => {
    console.log("Cliente solicitó ubicación");
    // Enviar respuesta simulada
    socket.emit("locationResponse", { lat: 10.987, lng: -74.788 });
  });
};
