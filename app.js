const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/email.routes");
const userRoutes = require("./routes/user.routes");
const petRoutes = require("./routes/pet.routes");

dotenv.config(); // Cargar variables de entorno

const app = express();

// Configuración
app.set("port", process.env.PORT || 3000); // Puerto del servidor

// Middleware
app.use(cors()); // Configuración de CORS
app.use(morgan("dev")); // Logger para desarrollo
app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: false })); // Parseo de formularios

// Rutas HTTP
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/sendEmail", emailRoutes); // Ruta específica para enviar emails

module.exports = app;
