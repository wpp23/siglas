import SistemaSigla from '../models/SistemaSiglaModel.js'

export default class SistemaSiglaController {    
    
    // GET - SELECT
    static async getAll(req, res) {
        try {
            const result = await SistemaSigla.getAll(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async getById(req, res) {
        try {
          const result = await SistemaSigla.getById(req, res);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ error: error.toString() });
        }
    }

    static async getByFilter(req, res) {
        try {
            const result = await SistemaSigla.getByFilter(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    //POST - INSERT
    static async post(req, res) {
        try {
            const result = await SistemaSigla.post(req, res);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    //PUT - UPDATE
    static async put(req, res) {
        try {
            const result = await SistemaSigla.put(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    //DEL - DELETE
    static async del(req, res) {
        try {
            const result = await SistemaSigla.del(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}