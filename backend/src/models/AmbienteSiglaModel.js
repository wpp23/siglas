import { sql } from '../schema/db.js';

export default class AmbienteSiglaModel {

  constructor() { }

  // GET - READ (ALL)
  static async getAll(req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`SELECT * FROM ambientesigla ORDER BY ordemambientesigla`;

      strResult = await strQuery;

      if (strResult) {
        return strResult;
      } else {
        return { message: 'Nenhum registro encontrado.' };
      }

    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // GET - READ (BY ID)
  static async getById(req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`SELECT * FROM ambientesigla WHERE idambientesigla = ${req.params.id}`;

      strResult = await strQuery;

      if (strResult) {
        return strResult;
      } else {
        return { message: 'Nenhum registro encontrado.' };
      }

    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // POST - INSERT
  static async post(req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`INSERT INTO ambientesigla 
                      (descrambientesigla, siglaambientesigla, ordemambientesigla) 
                      VALUES (
                      ${req.body.descrambientesigla}, 
                      ${req.body.siglaambientesigla}, 
                      ${req.body.ordemambientesigla}) RETURNING idambientesigla id`;

      strResult = await strQuery;

      if (strResult) {
        return strResult;
      } else {
        return { message: 'Erro ao inserir registro.' };
      }

    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // PUT - UPDATE
  static async put(req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`UPDATE ambientesigla SET
                          descrambientesigla = ${req.body.descrambientesigla}, 
                          siglaambientesigla = ${req.body.siglaambientesigla}, 
                          ordemambientesigla = ${req.body.ordemambientesigla}
                      WHERE 
                          idambientesigla = ${req.params.id}`;

      strResult = await strQuery;

      if (strResult) {
        return strResult;
      } else {
        return { message: 'Erro ao atualizar o registro.' };
      }

    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // DELETE
  static async del(req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`DELETE FROM ambientesigla WHERE idambientesigla = ${req.params.id}`;

      strResult = await strQuery;

      if (strResult) {
        return strResult;
      } else {
        return { message: 'Erro ao excluir o registro.' };
      }

    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}
