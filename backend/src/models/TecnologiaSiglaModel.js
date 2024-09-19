import { sql } from '../schema/db.js';

export default class TecnologiaSiglaModel {

  constructor() { }

  // GET - READ (ALL)
  static async getAll (req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`SELECT * FROM v_tecnologiassiglas ORDER BY tipotecnologiaversao`;

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

      strQuery = sql`SELECT * FROM tecnologiasigla WHERE idtecnologiasigla = ${req.params.id}`;

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

      strQuery = sql`INSERT INTO tecnologiasigla 
                      (idsigla, idversaotecnologia, idambientesigla) 
                      VALUES (
                      ${req.body.idsigla}, 
                      ${req.body.idversaotecnologia}, 
                      ${req.body.idambientesigla}) RETURNING idtecnologiasigla id`;

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

      strQuery = sql`UPDATE tecnologiasigla SET
                          idsigla = ${req.body.idsigla}, 
                          idversaotecnologia = ${req.body.idversaotecnologia}, 
                          idambientesigla = ${req.body.idambientesigla}
                      WHERE 
                          idtecnologiasigla = ${req.params.id}`;

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

      strQuery = sql`DELETE FROM tecnologiasigla WHERE idtecnologiasigla = ${req.params.id}`;

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
