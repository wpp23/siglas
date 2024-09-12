import { sql } from '../schema/db.js';

export default class TipoSistemaModel {

  constructor() { }

  // GET - READ (ALL)
  static async getAll (req, res) {

    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`SELECT * FROM TipoSistema`;

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

      strQuery = sql`SELECT * FROM TipoSistema WHERE idtiposistema = ${req.params.id}`;

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

      strQuery = sql`INSERT INTO TipoSistema 
                      (descrtiposistema) 
                      VALUES (
                      ${req.body.descrtiposistema}) RETURNING idtiposistema id`;

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

      strQuery = sql`UPDATE TipoSistema SET
                          descrtiposistema = ${req.body.descrtiposistema}
                      WHERE 
                          idtiposistema = ${req.params.id}`;

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

      strQuery = sql`DELETE FROM TipoSistema WHERE idtiposistema = ${req.params.id}`;

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