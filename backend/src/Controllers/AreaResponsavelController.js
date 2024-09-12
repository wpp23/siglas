import AreaResponsavel from '../models/AreaResponsavelModel.js'

export default class AreaResponsavelController {    
    
    static async getAll(req, res) {
        try {
            const result = await AreaResponsavel.getAll(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async getById(req, res) {
        try {
            const result = await AreaResponsavel.getById(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async post(req, res) {
        try {
            const result = await AreaResponsavel.post(req, res);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async put(req, res) {
        try {
            const result = await AreaResponsavel.put(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async del(req, res) {
        try {
            const result = await AreaResponsavel.del(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}