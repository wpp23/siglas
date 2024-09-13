import { sql } from '../schema/db.js';

export default class SiglaModel {

    constructor() { }

    //GET
    static async getAll (req, res) {
        try {
            let strResult="";
            let strQuery="";

            strQuery = sql`SELECT * FROM v_siglas ORDER BY sigla`;
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

            strQuery = sql`SELECT * FROM v_siglas WHERE idsigla = ${req.params.id}`;

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
            const idTiposigla = req.query.idtiposigla; // Obter o IDTiposigla da requisição
            const idSituacaosigla = req.query.idsituacaosigla; // Obter o IDSituacaosigla da requisição

            let strResult="";
            let strQuery="";

            // Se IDTiposigla ou IDSituacaosigla fornecido não é um número, lançar um erro
            if ((idTiposigla && isNaN(idTiposigla)) || (idSituacaosigla && isNaN(idSituacaosigla))) {
                throw new Error("Parâmetro fornecido não é um número.");
            } else {
                strQuery = sql`SELECT * FROM v_siglas WHERE 1=1 `;

                if (idTiposigla) {
                    strQuery = sql`${strQuery} AND idTiposigla = ${idTiposigla}`;
                }

                if (idSituacaosigla) {
                    strQuery = sql`${strQuery} AND IDSituacaosigla = ${idSituacaosigla}`;
                }

                strQuery = sql`${strQuery} ORDER BY sigla`;

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

            strQuery = sql`INSERT INTO sigla 
                            (sigla, descricaosigla, idsiglapai, 
                            idtiposigla, idarearesponsavel, idsituacaosigla, dataproducao, datainativacao, 
                            obssigla, siglacritica, gov_clientid, gov_scopes, gov_redirecturi) 
                            VALUES (
                            ${req.body.sigla}, 
                            ${req.body.descricaosigla}, 
                            ${req.body.idsiglapai}, 
                            ${req.body.idtiposigla}, 
                            ${req.body.idarearesponsavel}, 
                            ${req.body.idsituacaosigla}, 
                            TO_DATE(${req.body.dataproducao}, 'YYYY-MM-DD'), 
                            TO_DATE(${req.body.datainativacao}, 'YYYY-MM-DD'), 
                            ${req.body.obssigla}, 
                            ${req.body.siglacritica}, 
                            ${req.body.gov_clientid}, 
                            ${req.body.gov_scopes}, 
                            ${req.body.gov_redirecturi}) RETURNING idsigla id`;

            
            console.log(strQuery);
            
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

            strQuery = sql`UPDATE sigla SET
                                sigla = ${req.body.sigla}, 
                                descricaosigla = ${req.body.descricaosigla}, 
                                idsiglapai = ${req.body.idsiglapai}, 
                                idtiposigla = ${req.body.idtiposigla}, 
                                idarearesponsavel = ${req.body.idarearesponsavel}, 
                                idsituacaosigla = ${req.body.idsituacaosigla}, 
                                dataproducao = TO_DATE(${req.body.dataproducao}, 'YYYY-MM-DD'), 
                                datainativacao = TO_DATE(${req.body.datainativacao}, 'YYYY-MM-DD'), 
                                obssigla = ${req.body.obssigla}, 
                                siglacritica = ${req.body.siglacritica}, 
                                gov_clientid = ${req.body.gov_clientid}, 
                                gov_scopes = ${req.body.gov_scopes}, 
                                gov_redirecturi = ${req.body.gov_redirecturi}
                            WHERE 
                                IDsigla = ${req.params.id}`;

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
        
            strQuery = sql`DELETE FROM sigla WHERE idsigla = ${req.params.id}`;

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