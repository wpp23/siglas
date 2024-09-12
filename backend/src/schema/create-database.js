import { sql } from './db.js';

// Criação de TABELAS e VIEWS do sistema
// Para executar digite na linha de comando: node create-database.js

sql`
CREATE TABLE IF NOT EXISTS tiposistema (
    idtiposistema SERIAL PRIMARY KEY,
    descrtiposistema VARCHAR(100)
);
`
.then(() => {
    console.log("tiposistema executada")
    return sql`
        INSERT INTO tiposistema (descrtiposistema) VALUES ('WEB Monolítico'), ('Aplicativo Mobile App'), ('Cliente/Servidor'), ('Sítio/Portal Dinâmico'), ('WS/API'), ('Projeto'), ('WEB Front+Back'), ('Sítio/Portal Estático'), ('Painel BI'), ('Low/No Code'), ('Ferramenta');
    `;
})
.then(() => {
    console.log("tiposistema inserts executados")
    return sql`
        CREATE TABLE IF NOT EXISTS situacaosistema (
            idsituacaosistema SERIAL PRIMARY KEY,
            descrsituacaosistema VARCHAR(100)
        );
    `
})
.then(() => {
    console.log("situacaosistema executada")
    return sql`
        INSERT INTO situacaosistema (descrsituacaosistema) VALUES ('ATIVO'), ('ATIVO-EXTERNO'), ('SUSPENSO'), ('DESATIVADO'), ('EM DESENVOLVIMENTO'), ('ATIVO-CONSULTA'), ('EM HOMOLOGAÇÃO');
    `;
})
.then(() => {
    console.log("situacaosistema inserts executados")
    return sql`
        CREATE TABLE IF NOT EXISTS arearesponsavel (
            idarearesponsavel SERIAL PRIMARY KEY,
            siglaarea VARCHAR(100) UNIQUE,
            descrarea VARCHAR(100)
        );
    `
})
.then(() => {
    console.log("arearesponsavel executada")
    return sql`
        CREATE TABLE IF NOT EXISTS sistemasigla (
            idsistema SERIAL PRIMARY KEY,
            siglasistema VARCHAR(100) UNIQUE,
            descricaosistema TEXT,
            idsistemapai INT,
            idtiposistema INT,
            idarearesponsavel INT,
            idsituacaosistema INT,
            dataproducao DATE,
            datainativacao DATE,
            obssistema TEXT,
            sistemacritico BOOLEAN,
            gov_clientid VARCHAR(100),
            gov_scopes VARCHAR(100),
            gov_redirecturi VARCHAR(100),
            FOREIGN KEY (idarearesponsavel) REFERENCES arearesponsavel(idarearesponsavel),
            FOREIGN KEY (idtiposistema) REFERENCES tiposistema(idtiposistema),
            FOREIGN KEY (idsituacaosistema) REFERENCES situacaosistema(idsituacaosistema)
        );
    `
})
.then(() => {
    console.log("sistemasigla executada")
    return sql`
        CREATE OR REPLACE VIEW v_sistemas AS
        SELECT        
            COALESCE(SS.IDSistema, 0) AS IDSistema, 
            SS.SiglaSistema, 
            SS.DescricaoSistema, 
            ss.IDSistemaPai, 
            COALESCE((SELECT SiglaSistema FROM SistemaSigla AS ss2 WHERE IDSistema = SS.IDSistemaPai), '') AS SisRelacionado, 
            TipoSistema.DescrTipoSistema, 
            AreaResponsavel.SiglaArea, 
            SS.ObsSistema, 
            TO_CHAR(SS.DataProducao, 'YYYY-MM-DD') AS DataProducao, 
            TO_CHAR(SS.DataInativacao, 'YYYY-MM-DD') AS DataInativacao, 
            SituacaoSistema.DescrSituacaoSistema, 
            ss.IDTipoSistema, 
            ss.IDAreaResponsavel, 
            ss.IDSituacaoSistema, 
            SS.SistemaCritico, 
            SS.Gov_Clientid, 
            SS.Gov_Scopes, 
            SS.Gov_RedirectUri
        FROM            
            SistemaSigla AS SS 
        LEFT OUTER JOIN
            TipoSistema ON SS.IDTipoSistema = TipoSistema.IDTipoSistema 
        LEFT OUTER JOIN
            AreaResponsavel ON SS.IDAreaResponsavel = AreaResponsavel.IDAreaResponsavel 
        LEFT OUTER JOIN
            SituacaoSistema ON SS.IDSituacaoSistema = SituacaoSistema.IDSituacaoSistema
    `
})
.then(() => {
    console.log("v_sistemas executada")
    console.log("----FIM----")
});
