import { sql } from '../schema/db.js';

export default class TipoSiglaModel {

  constructor() { }

  // GET - READ (ALL)
  static async getAll (req, res) {

    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`SELECT * FROM tiposigla`;

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
  static async getById (req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`SELECT * FROM tiposigla WHERE idtiposigla = ${req.params.id}`;

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
  static async post (req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`INSERT INTO tiposigla 
                      (descrtiposigla) 
                      VALUES (
                      ${req.body.descrtipoSigla}) RETURNING idtiposigla id`;

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
  static async put (req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`UPDATE tiposigla SET
                          descrtiposigla = ${req.body.descrtipoSigla}
                      WHERE 
                          idtiposigla = ${req.params.id}`;

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
  static async del (req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`DELETE FROM tiposigla WHERE idtiposigla = ${req.params.id}`;

      strResult = await strQuery;

      if (strResult) {
        return strResult;
      } else {
        return { error: 'Erro ao excluir o registro.' };
      }

    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};