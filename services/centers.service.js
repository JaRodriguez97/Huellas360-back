const Pet = require("../models/Pet");
const Center = require("../models/Center");

class CenterService {
  async getAllCenters() {
    return await Center.find({});
  }

  async getCenterById(centerId) {
    return await Center.findById(centerId);
  }

  async createCenter(centerData) {
    const newCenter = new Center(centerData);
    return await newCenter.save();
  }

  async updateCenter(centerId, updateData) {
    return await Center.findByIdAndUpdate(centerId, updateData, { new: true });
  }

  async deleteCenter(centerId) {
    return await Center.findByIdAndDelete(centerId);
  }

  async getPetsByCenter(centerId) {
    return await Pet.find({ center: centerId }).select(
      "name type age healthStatus"
    );
  }
}

module.exports = new CenterService();
