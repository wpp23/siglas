import Sigla from '../models/SiglaModel.js'

export default class SiglaController {    
    
    // GET - SELECT
    static async getAll(req, res) {
        try {
            const result = await Sigla.getAll(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async getById(req, res) {
        try {
          const result = await Sigla.getById(req, res);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ error: error.toString() });
        }
    }

    static async getByFilter(req, res) {
        try {
            const result = await Sigla.getByFilter(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    //POST - INSERT
    static async post(req, res) {
        try {
            const result = await Sigla.post(req, res);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    //PUT - UPDATE
    static async put(req, res) {
        try {
            const result = await Sigla.put(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    //DEL - DELETE
    static async del(req, res) {
        try {
            const result = await Sigla.del(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}