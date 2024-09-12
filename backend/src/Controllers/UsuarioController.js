import Usuario from '../models/UsuarioModel.js'
export default class UsuarioController {    
    
    static async getAll(req, res) {
        try {
            const result = await Usuario.getAll(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async getById(req, res) {
        try {
            const result = await Usuario.getById(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async post(req, res) {
        try {
            const result = await Usuario.post(req, res);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async put(req, res) {
        try {
            const result = await Usuario.put(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async del(req, res) {
        try {
            const result = await Usuario.del(req, res);
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}
