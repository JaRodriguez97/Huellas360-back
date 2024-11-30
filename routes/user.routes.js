const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// Rutas CRUD para usuarios
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);


module.exports = router;
