const UserService = require("../services/users.service");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios", error });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Verificar si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Correo incorrecto" });
      }

      // Comparar la contraseña
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Contraseña incorrecta" });
      }

      // Generar el token JWT
      const token = user.generateAuthToken();

      // Retornar el token como respuesta
      res.json({
        message: "Login exitoso",
        token,
        user: {
          id: user._id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async createUser(req, res) {
    const { nombre, apellido, email, password, confirmPassword, terms } =
      req.body;

    // Validación de contraseñas
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden." });
    }

    try {
      // Verificar si el email ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "El email ya está registrado." });
      }

      // Crear el nuevo usuario
      const newUser = new User({ nombre, apellido, email, password, terms });

      // Guardar el usuario
      await newUser.save();

      // Generar el token JWT
      const token = newUser.generateAuthToken();

      // Responder con el usuario y el token
      res.status(201).json({
        message: "Usuario registrado exitosamente.",
        user: {
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          email: newUser.email,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al registrar el usuario." });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      if (!updatedUser)
        return res.status(404).json({ message: "Usuario no encontrado" });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar usuario", error });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: "Usuario no encontrado" });
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar usuario", error });
    }
  }
}

module.exports = new UserController();
