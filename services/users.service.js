const User = require("../models/User");

class UserService {
  async getAllUsers() {
    return await User.find({});
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }

  async createUser(userData) {
    const newUser = new User(userData);
    return await newUser.save();
  }

  async updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }
}

module.exports = new UserService();
