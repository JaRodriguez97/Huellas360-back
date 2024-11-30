const app = require("./app"); // Archivo de configuración de Express
const { mongoose } = require("./database"); // Conexión a la base de datos
const http = require("http"); // Servidor HTTP
const { configureSocket } = require("./sockets/socket"); // Configuración de Socket.IO

// Crear servidor HTTP a partir de Express
const server = http.createServer(app);

// Configurar Socket.IO
configureSocket(server); // Pasar el servidor al módulo de sockets

// Iniciar servidor
server.listen(app.get("port"), () => {
  console.log("Servidor activo en puerto:", app.get("port"));
});
