import { sql } from '../schema/db.js';

export default class VersaoTecnologiaModel {

  constructor() { }

  // GET - READ (ALL)
  static async getAll(req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`SELECT * FROM Versaotecnologia`;

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

      strQuery = sql`SELECT * FROM Versaotecnologia WHERE idversaotecnologia = ${req.params.id}`;

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

      strQuery = sql`INSERT INTO Versaotecnologia 
                      (idtecnologia, numeroversao, indversaoatual) 
                      VALUES (
                      ${req.body.idtecnologia}, 
                      ${req.body.numeroversao}, 
                      ${req.body.indversaoatual}) RETURNING idversaotecnologia id`;

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

      strQuery = sql`UPDATE Versaotecnologia SET
                          idtecnologia = ${req.body.idtecnologia}, 
                          numeroversao = ${req.body.numeroversao}, 
                          indversaoatual = ${req.body.indversaoatual}
                      WHERE 
                          idversaotecnologia = ${req.params.id}`;

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

      strQuery = sql`DELETE FROM Versaotecnologia WHERE idversaotecnologia = ${req.params.id}`;

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
