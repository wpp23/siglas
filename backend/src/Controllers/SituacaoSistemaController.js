import SituacaoSistema from "../models/SituacaoSistemaModel.js";

export default class SituacaoSistemaController {
  
  static async getAll(req, res) {
    try {
      const result = await SituacaoSistema.getAll(req, res);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async getById(req, res) {
    try {
      const result = await SituacaoSistema.getById(req, res);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async post(req, res) {
    try {
      const result = await SituacaoSistema.post(req, res);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async put(req, res) {
    try {
      const result = await SituacaoSistema.put(req, res);
      res.status(204).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async del(req, res) {
    try {
      const result = await SituacaoSistema.del(req, res);
      res.status(204).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
}