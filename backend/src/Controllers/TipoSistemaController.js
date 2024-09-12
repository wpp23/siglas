import TipoSistema from '../models/TipoSistemaModel.js'

export default class TipoSistemaController {    
    static async getAll(req, res) {
        try {
            const result = await TipoSistema.getAll(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async getById(req, res) {
        try {
            const result = await TipoSistema.getById(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async post(req, res) {
        try {
            const result = await TipoSistema.post(req, res);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async put(req, res) {
        try {
            const result = await TipoSistema.put(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async del(req, res) {
        try {
            const result = await TipoSistema.del(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}