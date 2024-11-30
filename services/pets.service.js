const Pet = require("../models/Pet");

class PetService {
  async getAllPets() {
    return await Pet.find({}).populate("center", "name address");
  }

  async getPetById(petId) {
    return await Pet.findById(petId).populate("center", "name address");
  }

  async createPet(petData) {
    const newPet = new Pet(petData);
    return await newPet.save();
  }

  async updatePet(petId, updateData) {
    return await Pet.findByIdAndUpdate(petId, updateData, { new: true });
  }

  async deletePet(petId) {
    return await Pet.findByIdAndDelete(petId);
  }

  async assignPetToCenter(petId, centerId) {
    const pet = await Pet.findById(petId);
    if (!pet) throw new Error("Mascota no encontrada");
    pet.center = centerId;
    return await pet.save();
  }
}

module.exports = new PetService();
