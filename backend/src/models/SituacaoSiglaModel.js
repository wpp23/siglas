import { sql } from '../schema/db.js';

export default class SituacaoSiglaModel {

  constructor() { }

  // GET - READ (ALL)
  static async getAll (req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`SELECT * FROM situacaosigla`;

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

      strQuery = sql`SELECT * FROM situacaosigla WHERE idsituacaosigla = ${req.params.id}`;

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

      strQuery = sql`INSERT INTO situacaosigla 
                      (descrsituacaosigla) 
                      VALUES (
                      ${req.body.descrsituacao}) RETURNING idsituacaosigla id`;

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

      strQuery = sql`UPDATE situacaosigla SET
                          descrsituacaosigla = ${req.body.descrsituacaosigla}
                      WHERE 
                          idsituacaosigla = ${req.params.id}`;

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

      strQuery = sql`DELETE FROM situacaosigla WHERE idsituacaosigla = ${req.params.id}`;

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