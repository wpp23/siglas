import SituacaoSigla from "../models/SituacaoSiglaModel.js";

export default class SituacaoSiglaController {
  
  static async getAll(req, res) {
    try {
      const result = await SituacaoSigla.getAll(req, res);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async getById(req, res) {
    try {
      const result = await SituacaoSigla.getById(req, res);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async post(req, res) {
    try {
      const result = await SituacaoSigla.post(req, res);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async put(req, res) {
    try {
      const result = await SituacaoSigla.put(req, res);
      res.status(204).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }

  static async del(req, res) {
    try {
      const result = await SituacaoSigla.del(req, res);
      res.status(204).json(result);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
}