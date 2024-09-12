import { sql } from '../schema/db.js';

export default class UsuarioModel {

  constructor() { }

  // GET - READ (ALL)
  static async getAll(req, res) {
    try {
      let strResult = "";
      let strQuery = "";

      strQuery = sql`
                  SELECT 
                      idusuario, 
                      login, 
                      indbloqueado,
                      CASE 
                          WHEN indbloqueado THEN 'Sim' 
                          ELSE '---' 
                      END AS descrbloqueado, 
                      pwd, 
                      TO_CHAR(datacriacao, 'DD/MM/YYYY') AS datacriacao
                  FROM seg_usuario;
                `;

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

      strQuery = sql`SELECT * FROM seg_usuario WHERE idusuario = ${req.params.id}`;

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

      strQuery = sql`INSERT INTO seg_usuario 
                      (login, indbloqueado, pwd, datacriacao) 
                      VALUES (
                      ${req.body.login}, 
                      ${req.body.indbloqueado}, 
                      ${req.body.pwd}, 
                      TO_DATE(${req.body.datacriacao}, 'YYYY-MM-DD')
                      ) RETURNING idusuario id`;

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

      strQuery = sql`UPDATE seg_usuario SET
                          login = ${req.body.login}, 
                          indbloqueado = ${req.body.indbloqueado}, 
                          pwd = ${req.body.pwd}, 
                          datacriacao = TO_DATE(${req.body.datacriacao}, 'YYYY-MM-DD')
                      WHERE 
                          idusuario = ${req.params.id}`;

      console.log(strQuery);

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

      strQuery = sql`DELETE FROM seg_usuario WHERE idusuario = ${req.params.id}`;

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
