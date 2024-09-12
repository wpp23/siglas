import { sql } from '../schema/db.js';

export default class SistemaSiglaModel {

    constructor() { }

    //GET
    static async getAll (req, res) {
        try {
            let strResult="";
            let strQuery="";

            strQuery = sql`SELECT * FROM v_Sistemas ORDER BY siglasistema`;
            strResult = await strQuery;

            if (strResult && strResult.length > 0) {
                return strResult;
            } else {
                return { message: 'Nenhum registro encontrado.' };
            }

        } catch (err) {
            console.error(err);
            throw err;
        }

    }

    static async getById(req, res) {

        try {

            let strResult="";
            let strQuery="";

            strQuery = sql`SELECT * FROM v_Sistemas WHERE idsistema = ${req.params.id}`;

            strResult = await strQuery;

            if (strResult && strResult.length > 0) {
                return strResult;
            } else {
                return { message: 'Nenhum registro encontrado.' };
            }

        } catch (err) {
            console.error(err);
            throw err;
        }
    }


    static async getByFilter (req, res) {
        try {
            const idTipoSistema = req.query.idtiposistema; // Obter o IDTipoSistema da requisição
            const idSituacaoSistema = req.query.idsituacaosistema; // Obter o IDSituacaoSistema da requisição

            let strResult="";
            let strQuery="";

            // Se IDTipoSistema ou IDSituacaoSistema fornecido não é um número, lançar um erro
            if ((idTipoSistema && isNaN(idTipoSistema)) || (idSituacaoSistema && isNaN(idSituacaoSistema))) {
                throw new Error("Parâmetro fornecido não é um número.");
            } else {
                strQuery = sql`SELECT * FROM v_Sistemas WHERE 1=1 `;

                if (idTipoSistema) {
                    strQuery = sql`${strQuery} AND idTipoSistema = ${idTipoSistema}`;
                }

                if (idSituacaoSistema) {
                    strQuery = sql`${strQuery} AND IDSituacaoSistema = ${idSituacaoSistema}`;
                }

                strQuery = sql`${strQuery} ORDER BY siglasistema`;

                strResult = await strQuery;
            }

            if (strResult && strResult.length > 0) {
                return strResult;
            } else {
                return { message: 'Nenhum registro encontrado.' };
            }

        } catch (err) {
            console.error(err);
            throw err;
        }
    }


    //POST - INSERT
    static async post(req, res){

        try {

            let strResult="";
            let strQuery="";

            strQuery = sql`INSERT INTO SistemaSigla 
                            (siglasistema, descricaosistema, idsistemapai, 
                            idtiposistema, idarearesponsavel, idsituacaosistema, dataproducao, datainativacao, 
                            obssistema, sistemacritico, gov_clientid, gov_scopes, gov_redirecturi) 
                            VALUES (
                            ${req.body.siglasistema}, 
                            ${req.body.descricaosistema}, 
                            ${req.body.idsistemapai}, 
                            ${req.body.idtiposistema}, 
                            ${req.body.idarearesponsavel}, 
                            ${req.body.idsituacaosistema}, 
                            TO_DATE(${req.body.dataproducao}, 'YYYY-MM-DD'), 
                            TO_DATE(${req.body.datainativacao}, 'YYYY-MM-DD'), 
                            ${req.body.obssistema}, 
                            ${req.body.sistemacritico}, 
                            ${req.body.gov_clientid}, 
                            ${req.body.gov_scopes}, 
                            ${req.body.gov_redirecturi}) RETURNING idsistema id`;

            strResult = await strQuery;
        
            if(strResult){
                return strResult;
            }else{
                return { message: 'Erro ao inserir registro.' };
            }

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //PUT - UPDATE
    static async put(req, res) {
        try {
            let strResult="";
            let strQuery="";

            strQuery = sql`UPDATE SistemaSigla SET
                                siglasistema = ${req.body.siglasistema}, 
                                descricaosistema = ${req.body.descricaosistema}, 
                                idsistemapai = ${req.body.idsistemapai}, 
                                idtiposistema = ${req.body.idtiposistema}, 
                                idarearesponsavel = ${req.body.idarearesponsavel}, 
                                idsituacaosistema = ${req.body.idsituacaosistema}, 
                                dataproducao = TO_DATE(${req.body.dataproducao}, 'YYYY-MM-DD'), 
                                datainativacao = TO_DATE(${req.body.datainativacao}, 'YYYY-MM-DD'), 
                                obssistema = ${req.body.obssistema}, 
                                sistemacritico = ${req.body.sistemacritico}, 
                                gov_clientid = ${req.body.gov_clientid}, 
                                gov_scopes = ${req.body.gov_scopes}, 
                                gov_redirecturi = ${req.body.gov_redirecturi}
                            WHERE 
                                IDSistema = ${req.params.id}`;

            strResult = await strQuery;
            if(strResult){
                return strResult;
            }else{
                return { message: 'Erro ao atualizar o registro.' };
            }

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //DELETE
    static async del(req, res) {

        try {

            let strResult = "";
            let strQuery = "";
        
            strQuery = sql`DELETE FROM SistemaSigla WHERE IDSistema = ${req.params.id}`;

            strResult = await strQuery;
            if(strResult){
                return strResult;
            }else{
                return { message: 'Erro ao excluir o registro.' };
            }

        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}