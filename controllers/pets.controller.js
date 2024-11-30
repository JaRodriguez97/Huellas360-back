const PetService = require("../services/pets.service");

class PetController {
  async getAllPets(req, res) {
    try {
      const pets = await PetService.getAllPets();
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las mascotas", error });
    }
  }

  async getPetById(req, res) {
    try {
      const pet = await PetService.getPetById(req.params.id);
      if (!pet)
        return res.status(404).json({ message: "Mascota no encontrada" });
      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la mascota", error });
    }
  }

  async createPet(req, res) {
    try {
      const newPet = await PetService.createPet(req.body);
      res.status(201).json(newPet);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la mascota", error });
    }
  }

  async updatePet(req, res) {
    try {
      const updatedPet = await PetService.updatePet(req.params.id, req.body);
      if (!updatedPet)
        return res.status(404).json({ message: "Mascota no encontrada" });
      res.status(200).json(updatedPet);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar la mascota", error });
    }
  }

  async deletePet(req, res) {
    try {
      const deletedPet = await PetService.deletePet(req.params.id);
      if (!deletedPet)
        return res.status(404).json({ message: "Mascota no encontrada" });
      res.status(200).json({ message: "Mascota eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la mascota", error });
    }
  }
}

module.exports = new PetController();
