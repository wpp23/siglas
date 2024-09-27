import {sql} from './db.js'

// Create Table SituacaoSistema
sql`
CREATE TABLE IF NOT EXISTS situacaosistema (
    idsituacaosistema SERIAL PRIMARY KEY,
    descrsituacaosistema VARCHAR(100) UNIQUE
);
`
.then(() => {
    console.log("situacaosistema criada")

    // Insert data into SituacaoSistema
    sql`
    INSERT INTO situacaosistema (descrsituacaosistema) VALUES ('ATIVO'), ('ATIVO-EXTERNO'), ('SUSPENSO'), ('DESATIVADO'), ('EM DESENVOLVIMENTO'), ('ATIVO-CONSULTA'), ('EM HOMOLOGAÇÃO');
    `
    .then(() => {
        console.log("situacaosistema inserida")

        // Create Table TipoSistema
        sql`
        CREATE TABLE IF NOT EXISTS tiposistema (
            idtiposistema SERIAL PRIMARY KEY,
            descrtiposistema VARCHAR(100) UNIQUE
        );
        `
        .then(() => {
            console.log("tiposistema criada")

            // Insert data into TipoSistema
            sql`
            INSERT INTO tiposistema (descrtiposistema) VALUES ('WEB Monolítico'), ('Aplicativo Mobile App'), ('Cliente/Servidor'), ('Sítio/Portal Dinâmico'), ('WS/API'), ('Projeto'), ('WEB Front+Back'), ('Sítio/Portal Estático'), ('Painel BI'), ('Low/No Code'), ('Ferramenta');
            `
            .then(() => {
                console.log("tiposistema inserida")

                // Create Table AreaResponsavel
                sql`
                CREATE TABLE IF NOT EXISTS arearesponsavel (
                    idarearesponsavel SERIAL PRIMARY KEY,
                    siglaarea VARCHAR(100) NOT NULL,
                    descrarea VARCHAR(200) NOT NULL
                );
                `
                .then(() => {
                    console.log("arearesponsavel criada")

                    // Insert data into AreaResponsavel
                    sql`
                    INSERT INTO arearesponsavel (siglaarea, descrarea) VALUES 
                    ('SETEC', 'Secretaria de Educação Profissional e Tecnológica'),
                    ('GM', 'Gabinete do Ministro'),
                    ('SE', 'Secretaria-Executiva'),
                    ('SEB', 'Secretaria de Educação Básica'),
                    ('SERES', 'Secretaria de Regulação e Supervisão da Educação Superior'),
                    ('SEALF (extinta)', 'Secretaria de Alfabetização'),
                    ('SEMESP (extinta)', 'Secretaria de Modalidades Especializadas de Educação'),
                    ('SESU', 'Secretaria de Educação Superior'),
                    ('SE/STIC', 'Subsecretaria de Tecnologia da Informação e Comunicação'),
                    ('SE/STIC/CGSA', 'Coordenação-Geral de Sistemas e Aplicações'),
                    ('SE/STIC/CGDA', 'Coordenação-Geral de Dados e Analitics'),
                    ('SE/STIC/CGATI', 'Coordenação-Geral de Arquitetura de Tecnologia da Informação'),
                    ('SE/SAA', 'Subsecretaria de Assuntos Administrativos'),
                    ('SE/SPO', 'Subsecretaria de Planejamento e Orçamento'),
                    ('SE/SAA/CGGP', 'Coordenação-Geral de Gestão de Pessoas'),
                    ('SE/SAA/CGLC', 'Coordenação-Geral de Licitações e Contratos'),
                    ('SE/SAA/CGRL', 'Coordenação-Geral de Recursos Logísticos'),
                    ('SE/SAA/CGGA', 'Coordenação-Geral de Gestão Administrativa'),
                    ('SEB/DARE', 'Diretoria de Articulação e Apoio às Redes de Educação Básica'),
                    ('SEB/DPR', 'DPR'),
                    ('FNDE', 'Fundo Nacional de Desenvolvimento da Educação'),
                    ('SEB/DICAP', 'DICAP'),
                    ('GM/ASPAR', 'Assessoria para Assuntos Parlamentares'),
                    ('GM/CONJUR', 'Consultoria Jurídica'),
                    ('INEP', 'Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira'),
                    ('EBSERH', 'Empresa Brasileira de Serviços Hospitalares'),
                    ('GM/ACS', 'Assessoria de Comunicação Social'),
                    ('SE/STIC/CGGOV', 'Coordenação-Geral de Governança de TI'),
                    ('SE/STIC/GAB', 'Gabinete da Subsecretaria de Tecnologia da Informação e Comunicação'),
                    ('SEB/DPD', 'Diretoria de Políticas e Diretrizes da Educação Básica / DPD'),
                    ('SECADI', 'Secretaria de Educação Continuada, Alfabetização de Jovens e Adultos, Diversidade e Inclusão'),
                    ('SASE', 'Secretaria de Articulação com os Sistemas de Ensino'),
                    ('SESU/DIFES/CGAI', 'Coordenação-Geral de Assuntos Internacionais da Educação Superior'),
                    ('SESU/DDES/CGRS', 'Coordenação-Geral de Residências em Saúde'),
                    ('SESU/DIPES/CGRED', 'Coordenação-Geral de Relações Estudantis e Serviços Digitais'),
                    ('SE/STIC/CGATI/CATI', 'Coordenação de Arquitetura de TI'),
                    ('SEGAPE', 'Secretaria de Gestão da Informação, Inovação e Avaliação de Políticas Educacionais'),
                    ('DIE/SEGAPE/MEC', 'Diretoria de Informações Estratégicas e Inovação');
                    `
                    .then(() => {
                        console.log("arearesponsavel inserida")

                        // Create Table ContratoEmpresa
                        sql`
                        CREATE TABLE IF NOT EXISTS contratoempresa (
                            idcontratoempresa SERIAL PRIMARY KEY,
                            numcontrato VARCHAR(10) NOT NULL,
                            nomeempresa VARCHAR(100) NOT NULL,
                            indaativo BOOLEAN
                        );
                        `
                        .then(() => {
                            console.log("contratoempresa criada")

                            // Insert data into ContratoEmpresa
                            sql`
                            INSERT INTO contratoempresa (numcontrato, nomeempresa, indaativo) VALUES 
                            ('025/2019', 'BASIS (FSW)', FALSE),
                            ('007/2021', 'G4F (Apoio à Gestão)', TRUE),
                            ('000/0001', 'MEC', TRUE),
                            ('000/0002', 'FNDE', TRUE),
                            ('000/0003', 'INEP', TRUE),
                            ('003/2022', 'G4F (Sustentação)', FALSE),
                            ('000/0004', 'RNP', TRUE),
                            ('006/2022', 'DIGISYSTEM (Desenvolvimento)', TRUE),
                            ('000/2022', 'CEFET-MG', FALSE),
                            ('015/2023', 'HITSS (Sustentação)', TRUE),
                            ('001/2022', 'FORTALEZA (Administrativo)', TRUE),
                            ('009/2023', 'DEFENDER (Administrativo)', FALSE),
                            ('017/2020', 'GESTOR (Secretariado)', TRUE),
                            ('011/2022', 'EXTREME DIGITAL CONSULTORIA E REPRESENTAÇÕES LTDA.', FALSE),
                            ('027/2018', 'IOS', FALSE),
                            ('003/2020', 'GLOBALWEB', TRUE),
                            ('031/2021', 'G4F (Microsoft Low/No Code)', TRUE),
                            ('999/2019', 'INDRA (Portais)', FALSE),
                            ('021/2023', 'UNIC (Suporte)', TRUE),
                            ('ED0/2023', 'OEI/UNESCO', TRUE),
                            ('004/2022', 'RCS (Administrativo)', TRUE),
                            ('TED 12691', 'UFSC', TRUE),
                            ('TED 13169', 'UFAL', TRUE),
                            ('008/2024', 'SOLLO (Administrativo)', TRUE);
                            `
                            .then(() => {
                                console.log("contratoempresa inserida")

                                // Create Table Sistemasigla
                                sql`
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
                                .then(() => {
                                    console.log("sistemasigla executada")

                                    // Create Table BaselineSistema
                                    sql`
                                    CREATE TABLE IF NOT EXISTS baselinesistema (
                                        idbaselinesistema SERIAL PRIMARY KEY,
                                        idsistema INT NOT NULL,
                                        valorbaseline NUMERIC(18, 2) NOT NULL,
                                        databaseline DATE NOT NULL,
                                        obsbaseline VARCHAR(500),
                                        indtipocontagem SMALLINT,
                                        FOREIGN KEY (idsistema) REFERENCES sistemasigla(idsistema)
                                    );
                                    `
                                    .then(() => {
                                        console.log("baselinesistema criada")

                                        // Create Table AmbienteSigla
                                        sql`
                                        CREATE TABLE IF NOT EXISTS ambientesigla (
                                            idambientesigla SERIAL PRIMARY KEY,
                                            descrambientesigla VARCHAR(50) NOT NULL,
                                            siglaambientesigla VARCHAR(10),
                                            ordemambientesigla VARCHAR(5)
                                        );
                                        `
                                        .then(() => {
                                            console.log("ambientesigla criada");

                                            // Insert data into AmbienteSigla
                                            sql`
                                            INSERT INTO ambientesigla (descrambientesigla, siglaambientesigla, ordemambientesigla) VALUES
                                                ('Desenvolvimento', 'DSV', '1'),
                                                ('Homologação', 'HMG', '2'),
                                                ('Treinamento', 'TRT', '3'),
                                                ('Sustentação', 'STO', '4'),
                                                ('Produção', 'PRD', '5');
                                            `
                                            .then(() => {
                                                console.log("ambientesigla inserida");

                                                // ... (rest of your code - creating remaining tables)
                                            })
                                            .catch(error => {
                                                console.error("Erro ao inserir dados na tabela ambientesigla:", error);
                                            });
                                        })
                                        .catch(error => {
                                            console.error("Erro ao criar tabela ambientesigla:", error);
                                        });
                                    })
                                    .catch(error => {
                                        console.error("Erro ao criar BaselineSistema:", error);
                                    });
                                })
                                .catch(error => {
                                    console.error("Erro ao criar Sistemasigla:", error);
                                });
                            })
                            .catch(error => {
                                console.error("Erro ao inserir ContratoEmpresa:", error);
                            });
                        })
                        .catch(error => {
                            console.error("Erro ao criar ContratoEmpresa:", error);
                        });
                    })
                    .catch(error => {
                        console.error("Erro ao criar AreaResponsavel:", error);
                    });
            })
            .catch(error => {
                console.error("Erro ao inserir TipoSistema:", error);
            });
        })
        .catch(error => {
            console.error("Erro ao criar TipoSistema:", error);
        });
    })
    .catch(error => {
        console.error("Erro ao inserir SituacaoSistema:", error);
    });
})
.catch(error => {
    console.error("Erro ao criar SituacaoSistema:", error);
})
});
