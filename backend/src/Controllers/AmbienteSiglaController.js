import AmbienteSigla from '../models/AmbienteSiglaModel.js'

export default class AmbienteSiglaController {    
    
    static async getAll(req, res) {
        try {
            const result = await AmbienteSigla.getAll(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async getById(req, res) {
        try {
            const result = await AmbienteSigla.getById(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async post(req, res) {
        try {
            const result = await AmbienteSigla.post(req, res);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async put(req, res) {
        try {
            const result = await AmbienteSigla.put(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async del(req, res) {
        try {
            const result = await AmbienteSigla.del(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}
