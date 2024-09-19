import VersaoTecnologia from '../models/VersaoTecnologia.js'

export default class VersaoTecnologiaController {    
    
    static async getAll(req, res) {
        try {
            const result = await VersaoTecnologia.getAll(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async getById(req, res) {
        try {
            const result = await VersaoTecnologia.getById(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async post(req, res) {
        try {
            const result = await VersaoTecnologia.post(req, res);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async put(req, res) {
        try {
            const result = await VersaoTecnologia.put(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async del(req, res) {
        try {
            const result = await VersaoTecnologia.del(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}
