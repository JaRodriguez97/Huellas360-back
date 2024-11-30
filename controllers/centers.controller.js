const CenterService = require("../services/centers.service");

class CenterController {
  async getAllCenters(req, res) {
    try {
      const centers = await CenterService.getAllCenters();
      res.status(200).json(centers);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los centros", error });
    }
  }

  async getCenterById(req, res) {
    try {
      const center = await CenterService.getCenterById(req.params.id);
      if (!center)
        return res.status(404).json({ message: "Centro no encontrado" });
      res.status(200).json(center);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el centro", error });
    }
  }

  async createCenter(req, res) {
    try {
      const newCenter = await CenterService.createCenter(req.body);
      res.status(201).json(newCenter);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el centro", error });
    }
  }

  async updateCenter(req, res) {
    try {
      const updatedCenter = await CenterService.updateCenter(
        req.params.id,
        req.body
      );
      if (!updatedCenter)
        return res.status(404).json({ message: "Centro no encontrado" });
      res.status(200).json(updatedCenter);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el centro", error });
    }
  }

  async deleteCenter(req, res) {
    try {
      const deletedCenter = await CenterService.deleteCenter(req.params.id);
      if (!deletedCenter)
        return res.status(404).json({ message: "Centro no encontrado" });
      res.status(200).json({ message: "Centro eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el centro", error });
    }
  }

  async getPetsByCenter(req, res) {
    try {
      const pets = await CenterService.getPetsByCenter(req.params.id);
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las mascotas", error });
    }
  }
}

module.exports = new CenterController();
