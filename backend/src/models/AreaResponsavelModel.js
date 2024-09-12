import { sql } from '../schema/db.js';

export default class AreaResponsavelModel {

   constructor() { }

  // GET - READ (ALL)
    static async getAll (req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`SELECT * FROM AreaResponsavel ORDER BY siglaarea`;

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

      strQuery = sql`SELECT * FROM AreaResponsavel WHERE idarearesponsavel = ${req.params.id}`;

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

      strQuery = sql`INSERT INTO AreaResponsavel 
                      (siglaarea, descrarea) 
                      VALUES (
                      ${req.body.siglaarea}, 
                      ${req.body.descrarea}) RETURNING idarearesponsavel id`;

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

      strQuery = sql`UPDATE AreaResponsavel SET
                          siglaarea = ${req.body.siglaarea}, 
                          descrarea = ${req.body.descrarea}
                      WHERE 
                          idarearesponsavel = ${req.params.id}`;

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

      strQuery = sql`DELETE FROM AreaResponsavel WHERE idarearesponsavel = ${req.params.id}`;

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

};