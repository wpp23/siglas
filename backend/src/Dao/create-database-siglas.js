import {sql} from './db.js'

// Create Table Situacaosigla
sql`
CREATE TABLE IF NOT EXISTS situacaosigla (
    idsituacaosigla SERIAL PRIMARY KEY,
    descrsituacaosigla VARCHAR(100) UNIQUE
);
`
.then(() => {
    console.log("situacaosigla criada")

    // Insert data into Situacaosigla
    sql`
    INSERT INTO situacaosigla (descrsituacaosigla) VALUES ('ATIVO'), ('ATIVO-EXTERNO'), ('SUSPENSO'), ('DESATIVADO'), ('EM DESENVOLVIMENTO'), ('ATIVO-CONSULTA'), ('EM HOMOLOGAÇÃO');
    `
    .then(() => {
        console.log("situacaosigla inserida")

        // Create Table Tiposigla
        sql`
        CREATE TABLE IF NOT EXISTS tiposigla (
            idtiposigla SERIAL PRIMARY KEY,
            descrtiposigla VARCHAR(100) UNIQUE
        );
        `
        .then(() => {
            console.log("tiposigla criada")

            // Insert data into Tiposigla
            sql`
            INSERT INTO tiposigla (descrtiposigla) VALUES ('WEB Monolítico'), ('Aplicativo Mobile App'), ('Cliente/Servidor'), ('Sítio/Portal Dinâmico'), ('WS/API'), ('Projeto'), ('WEB Front+Back'), ('Sítio/Portal Estático'), ('Painel BI'), ('Low/No Code'), ('Ferramenta');
            `
            .then(() => {
                console.log("tiposigla inserida")

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

                                // Create Table sigla
                                sql`
                                CREATE TABLE IF NOT EXISTS sigla (
                                    idsigla SERIAL PRIMARY KEY,
                                    sigla VARCHAR(100) UNIQUE,
                                    descricaosigla TEXT,
                                    idsiglapai INT,
                                    idtiposigla INT,
                                    idarearesponsavel INT,
                                    idsituacaosigla INT,
                                    dataproducao DATE,
                                    datainativacao DATE,
                                    obssigla TEXT,
                                    siglacritica BOOLEAN,
                                    gov_clientid VARCHAR(100),
                                    gov_scopes VARCHAR(100),
                                    gov_redirecturi VARCHAR(100),
                                    FOREIGN KEY (idarearesponsavel) REFERENCES arearesponsavel(idarearesponsavel),
                                    FOREIGN KEY (idtiposigla) REFERENCES tiposigla(idtiposigla),
                                    FOREIGN KEY (idsituacaosigla) REFERENCES situacaosigla(idsituacaosigla)
                                );
                                `
                                .then(() => {
                                    console.log("sigla executada")

                                    // Create Table Baselinesigla
                                    sql`
                                    CREATE TABLE IF NOT EXISTS baselinesigla (
                                        idbaselinesigla SERIAL PRIMARY KEY,
                                        idsigla INT NOT NULL,
                                        valorbaseline NUMERIC(18, 2) NOT NULL,
                                        databaseline DATE NOT NULL,
                                        obsbaseline VARCHAR(500),
                                        indtipocontagem SMALLINT,
                                        FOREIGN KEY (idsigla) REFERENCES sigla(idsigla)
                                    );
                                    `
                                    .then(() => {
                                        console.log("baselinesigla criada")

                                        // Create Table TipoTecnologia
                                        sql`
                                        CREATE TABLE IF NOT EXISTS tipotecnologia (
                                            idtipotecnologia SERIAL PRIMARY KEY,
                                            descrtipotecnologia VARCHAR(100) UNIQUE
                                        );
                                        `
                                        .then(() => {
                                            console.log("tipotecnologia criada")

                                            // Insert data into TipoTecnologia
                                            sql`
                                            INSERT INTO tipotecnologia (descrtipotecnologia) VALUES 
                                            ('LINGUAGEM PROGRAMAÇÃO'),
                                            ('BANCO DE DADOS'),
                                            ('FRAMEWORK FRONT-END'),
                                            ('FRAMEWORK BACK-END'),
                                            ('MENSAGERIA'),
                                            ('NUVEM'),
                                            ('SERVIDOR APLICAÇÃO'),
                                            ('REPOSITÓRIO CÓDIGO-FONTE'),
                                            ('CMS'),
                                            ('FERRAMENTA BI'),
                                            ('FRAMEWORK MOBILE'),
                                            ('FERRAMENTA TERCEIROS'),
                                            ('CACHE'),
                                            ('FERRAMENTA DE BUSCA'),
                                            ('DESIGN SYSTEM'),
                                            ('PIPELINE DEPLOY');
                                            `
                                            .then(() => {
                                                console.log("tipotecnologia inserida")

                                                // Create Table Tecnologia
                                                sql`
                                                CREATE TABLE IF NOT EXISTS tecnologia (
                                                    idtecnologia SERIAL PRIMARY KEY,
                                                    descrtecnologia VARCHAR(100) NOT NULL,
                                                    idtipotecnologia INT,
                                                    indtecnologiaultrapassada BOOLEAN
                                                );
                                                `
                                                .then(() => {
                                                    console.log("tecnologia criada")

                                                    // Insert data into Tecnologia
                                                    sql`
                                                    INSERT INTO tecnologia (descrtecnologia, idtipotecnologia, indtecnologiaultrapassada) VALUES 
                                                    ('.NET Framework', 1, FALSE),
                                                    ('JAVA', 1, FALSE),
                                                    ('JOOMLA', 9, FALSE),
                                                    ('PHP', 1, FALSE),
                                                    ('IONIC', 14, FALSE),
                                                    ('ASP', 1, TRUE),
                                                    ('HTML', 1, FALSE),
                                                    ('Moodle', 15, FALSE),
                                                    ('Node.JS', 4, FALSE),
                                                    ('Power Apps - Microsoft', 1, FALSE),
                                                    ('React JS', 3, FALSE),
                                                    ('Python', 1, FALSE),
                                                    ('Delphi', 1, TRUE),
                                                    ('Power BI - Microsoft', 10, FALSE),
                                                    ('LARAVEL PHP', 4, FALSE),
                                                    ('REDIS', 17, FALSE),
                                                    ('PostgreSQL', 2, FALSE),
                                                    ('Oracle', 2, FALSE),
                                                    ('SQL Server', 2, FALSE),
                                                    ('MySQL', 2, FALSE),
                                                    ('MongoDB', 2, FALSE),
                                                    ('Bootstrap', 3, FALSE),
                                                    ('Angular', 3, FALSE),
                                                    ('Apache Kafka', 5, FALSE),
                                                    ('RabbitMQ', 5, FALSE),
                                                    ('Elasticsearch', 18, FALSE),
                                                    ('Container - Docker', 7, FALSE),
                                                    ('Amazon AWS', 6, FALSE),
                                                    ('DS Gov.br', 19, FALSE),
                                                    ('GIT CI/CD', 20, FALSE),
                                                    ('JENKINS', 20, TRUE),
                                                    ('GITLAB', 8, FALSE),
                                                    ('SVN SUBVERSION', 8, TRUE),
                                                    ('Deploy Manual', 20, TRUE),
                                                    ('Google Cloud GCP', 6, FALSE),
                                                    ('ON-PREMISE MEC', 6, FALSE),
                                                    ('JBOSS', 7, FALSE),
                                                    ('Apache', 7, FALSE),
                                                    ('Huawei Cloud', 6, FALSE),
                                                    ('Javascript ES', 1, FALSE);
                                                    `
                                                    .then(() => {
                                                        console.log("tecnologia inserida")

                                                        // Create Table VersaoTecnologia
                                                        sql`
                                                        CREATE TABLE IF NOT EXISTS versaotecnologia (
                                                            idversaotecnologia SERIAL PRIMARY KEY,
                                                            idtecnologia INT NOT NULL,
                                                            numeroversao VARCHAR(100) NOT NULL,
                                                            indversaoatual BOOLEAN,
                                                            FOREIGN KEY (idtecnologia) REFERENCES tecnologia(idtecnologia)
                                                        );
                                                        `
                                                        .then(() => {
                                                            console.log("versaotecnologia criada")

                                                            // Insert data into VersaoTecnologia
                                                            sql`
                                                            INSERT INTO versaotecnologia (idtecnologia, numeroversao, indversaoatual) VALUES 
                                                            (16, '3.0', TRUE),
                                                            (17, '4.01', FALSE),
                                                            (17, '5', TRUE),
                                                            (5, '4.x', TRUE),
                                                            (5, '5.x', TRUE),
                                                            (28, '8.0', FALSE),
                                                            (28, '9.0', FALSE),
                                                            (28, '10.0', TRUE),
                                                            (22, '16.0', FALSE),
                                                            (22, '17.0', TRUE),
                                                            (22, '18.0', TRUE),
                                                            (1, '4.8', TRUE),
                                                            (2, '8', TRUE),
                                                            (2, '6', FALSE),
                                                            (6, '7.1', FALSE),
                                                            (6, '7.2', FALSE),
                                                            (6, '5.5', FALSE),
                                                            (6, '8', TRUE),
                                                            (19, '3.0', FALSE),
                                                            (19, '4.0', TRUE),
                                                            (29, '5.0', FALSE),
                                                            (29, '6.0', FALSE),
                                                            (29, '7.0', TRUE),
                                                            (30, '8', FALSE),
                                                            (30, '9.3', FALSE),
                                                            (30, '10', FALSE),
                                                            (30, '11', FALSE),
                                                            (30, '12', FALSE),
                                                            (30, '13', FALSE),
                                                            (30, '14', TRUE),
                                                            (30, '15', TRUE),
                                                            (30, '16', TRUE),
                                                            (31, '12c', FALSE),
                                                            (31, '19c', TRUE),
                                                            (31, '21c', TRUE),
                                                            (32, '2012', FALSE),
                                                            (32, '2016', FALSE),
                                                            (32, '2017', FALSE),
                                                            (32, '2019', TRUE),
                                                            (32, '2022', TRUE),
                                                            (30, '9.6', FALSE),
                                                            (33, '8.3', TRUE),
                                                            (33, '8', FALSE),
                                                            (34, '8.0', TRUE),
                                                            (34, '7.0', FALSE),
                                                            (34, '6.0', FALSE),
                                                            (34, '5.0', FALSE),
                                                            (6, '5.6', FALSE),
                                                            (6, '7.4', FALSE),
                                                            (35, 'v3', FALSE),
                                                            (35, 'v4', FALSE),
                                                            (35, 'v5', TRUE),
                                                            (36, '17', TRUE),
                                                            (36, '16', TRUE),
                                                            (36, '15', FALSE),
                                                            (36, '14', FALSE),
                                                            (36, '13', FALSE),
                                                            (20, 'v22', TRUE),
                                                            (20, 'v21', TRUE),
                                                            (20, 'v20', FALSE),
                                                            (20, 'v19', FALSE),
                                                            (20, 'v18', FALSE),
                                                            (20, 'v17', FALSE),
                                                            (20, 'v16', FALSE),
                                                            (37, '3', TRUE),
                                                            (37, '2.7', TRUE),
                                                            (37, '1.1', FALSE),
                                                            (38, '3.11', TRUE),
                                                            (38, '3.10', TRUE),
                                                            (38, '3.9', FALSE),
                                                            (38, '3.8', FALSE),
                                                            (39, '3.2', TRUE),
                                                            (39, '2.7', FALSE),
                                                            (39, '1.1', FALSE),
                                                            (21, 'Estável', TRUE),
                                                            (21, 'Prévia', FALSE),
                                                            (5, '3.x', FALSE),
                                                            (41, 'Região XXX', TRUE),
                                                            (42, '3.5.1', TRUE),
                                                            (43, 's/n', TRUE),
                                                            (44, 's/n', FALSE),
                                                            (46, 's/n', FALSE),
                                                            (45, 's/n', TRUE),
                                                            (47, 's/n', FALSE),
                                                            (48, 'Região XXX', TRUE),
                                                            (40, 's/n', TRUE),
                                                            (49, 's/n', TRUE),
                                                            (26, 's/n', TRUE),
                                                            (28, '6.x', FALSE),
                                                            (28, '7.x', FALSE),
                                                            (52, 'Região XXX', TRUE),
                                                            (53, 'ES5 2009', FALSE),
                                                            (53, 'ES6 (2015)', FALSE),
                                                            (53, 'ES 2016', FALSE),
                                                            (53, 'ES 2017', FALSE),
                                                            (53, 'ES 2018', FALSE),
                                                            (53, 'ES 2019', TRUE),
                                                            (53, 'ES 2020', TRUE),
                                                            (2, '11', FALSE),
                                                            (2, '17', FALSE),
                                                            (2, '18', FALSE),
                                                            (30, '9.4', FALSE),
                                                            (36, '8.x', FALSE);
                                                            `
                                                            .then(() => {
                                                                console.log("versaotecnologia inserida")

                                                                // Create tecnologiasigla
                                                                sql`
                                                                CREATE TABLE IF NOT EXISTS tecnologiasigla (
                                                                    idtecnologiasigla SERIAL PRIMARY KEY,
                                                                    idsigla INT NOT NULL,
                                                                    idversaotecnologia INT NOT NULL,
                                                                    idambientesigla INT NULL,
                                                                    FOREIGN KEY (idsigla) REFERENCES sigla(idsigla),
                                                                    FOREIGN KEY (idversaotecnologia) REFERENCES versaotecnologia(idversaotecnologia)
                                                                );
                                                                `
                                                                .then(() => {
                                                                    console.log("tecnologiasigla criada")

                                                                    console.log("FIM")
                                                                })
                                                                .catch(error => {
                                                                    console.error("Erro ao criar tecnologiasigla:", error);

                                                                })

                                                                // Create v_tecnologiassiglas
                                                                sql`
                                                                CREATE VIEW v_TecnologiasSiglas AS
                                                                SELECT
                                                                    ts.IDTecnologiaSigla,
                                                                    tt.IDTipoTecnologia,
                                                                    tt.DescrTipoTecnologia,
                                                                    t.IDTecnologia,
                                                                    t.DescrTecnologia,
                                                                    COALESCE(t.indTecnologiaUltrapassada::int, 0) AS indTecnologiaUltrapassada,
                                                                    vt.IDVersaoTecnologia,
                                                                    COALESCE(vt.NumeroVersao, '') AS NumeroVersao,
                                                                    COALESCE(vt.IndVersaoAtual::int, 0) AS IndVersaoAtual,
                                                                    ts.IDSigla,
                                                                    t.DescrTecnologia || ' (' || COALESCE(vt.NumeroVersao, '') || ')' AS TecnologiaVersao,
                                                                    tt.DescrTipoTecnologia || 
                                                                    CASE WHEN COALESCE(t.indTecnologiaUltrapassada::int, 0) = 1 THEN ' (Tec.Ultrapassada)' ELSE '' END ||
                                                                    ' - ' || 
                                                                    t.DescrTecnologia || ' (' || COALESCE(vt.NumeroVersao, '') || ')' ||
                                                                    CASE WHEN COALESCE(vt.IndVersaoAtual::int, 0) = 1 THEN ' (Estável)' ELSE '' END
                                                                    AS TipoTecnologiaVersao,
                                                                    t.DescrTecnologia || ' (' || COALESCE(vt.NumeroVersao, '') || ')' ||
                                                                    CASE WHEN COALESCE(vt.IndVersaoAtual::int, 0) = 1 THEN ' (Estável)' ELSE '' END ||
                                                                    ' - ' || tt.DescrTipoTecnologia || 
                                                                    CASE WHEN COALESCE(t.indTecnologiaUltrapassada::int, 0) = 1 THEN ' (Tec.Ultrapassada)' ELSE '' END
                                                                    AS TecnologiaVersaoTipo
                                                                FROM
                                                                    tecnologiasigla ts 
                                                                    INNER JOIN versaotecnologia vt ON ts.IDVersaoTecnologia = vt.IDVersaoTecnologia
                                                                    INNER JOIN tecnologia t ON vt.IDTecnologia = t.IDTecnologia
                                                                    LEFT JOIN tipotecnologia tt ON t.IDTipoTecnologia = tt.IDTipoTecnologia;
                                                                `
                                                                .then(() => {
                                                                    console.log("v_TecnologiasSiglas criada")

                                                                    console.log("FIM")

                                                                })
                                                                .catch(error => {
                                                                    console.error("Erro ao criar v_TecnologiasSiglas:", error);

                                                                })


                                                                // Create v_siglas
                                                                sql`
                                                                    CREATE VIEW v_siglas AS
                                                                    select        
                                                                        coalesce(ss.idsigla, 0) as idsigla, 
                                                                        ss.sigla, 
                                                                        ss.descricaosigla, 
                                                                        coalesce(ss.idsiglapai, 0) as idsiglapai, 
                                                                        coalesce((select sigla from sigla as ss2 where idsigla = ss.idsiglapai), '') as siglarelacionada, 
                                                                        tiposigla.descrtiposigla, 
                                                                        arearesponsavel.siglaarea, 
                                                                        ss.obssigla, 
                                                                        to_char(ss.dataproducao, 'dd/mm/yyyy') as dataproducao, 
                                                                        to_char(ss.datainativacao, 'dd/mm/yyyy') as datainativacao, 
                                                                        situacaosigla.descrsituacaosigla, 
                                                                        coalesce(ss.idtiposigla, 0) as idtiposigla, 
                                                                        coalesce(ss.idarearesponsavel, 0) as idarearesponsavel, 
                                                                        coalesce(ss.idsituacaosigla, 0) as idsituacaosigla, 
                                                                        ss.siglacritica, 
                                                                        ss.gov_clientid, 
                                                                        ss.gov_scopes, 
                                                                        ss.gov_redirecturi
                                                                    from            
                                                                        sigla as ss 
                                                                    left outer join
                                                                        tiposigla on ss.idtiposigla = tiposigla.idtiposigla 
                                                                    left outer join
                                                                        arearesponsavel on ss.idarearesponsavel = arearesponsavel.idarearesponsavel 
                                                                    left outer join
                                                                        situacaosigla on ss.idsituacaosigla = situacaosigla.idsituacaosigla;
                                                                `
                                                                .then(() => {
                                                                    console.log("v_siglas criada")

                                                                    console.log("FIM")
                                                                })
                                                                .catch(error => {
                                                                    console.error("Erro ao criar v_siglas:", error);
                                                            })
                                                            .catch(error => {
                                                                console.error("Erro ao inserir VersaoTecnologia:", error);
                                                            });
                                                        })
                                                        .catch(error => {
                                                            console.error("Erro ao criar VersaoTecnologia:", error);
                                                        });
                                                    })
                                                    .catch(error => {
                                                        console.error("Erro ao inserir Tecnologia:", error);
                                                    });
                                                })
                                                .catch(error => {
                                                    console.error("Erro ao criar Tecnologia:", error);
                                                });
                                            })
                                            .catch(error => {
                                                console.error("Erro ao inserir TipoTecnologia:", error);
                                            });
                                        })
                                        .catch(error => {
                                            console.error("Erro ao criar TipoTecnologia:", error);
                                        });
                                    })
                                    .catch(error => {
                                        console.error("Erro ao criar Baselinesigla:", error);
                                    });
                                })
                                .catch(error => {
                                    console.error("Erro ao criar sigla:", error);
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
                console.error("Erro ao inserir Tiposigla:", error);
            });
        })
        .catch(error => {
            console.error("Erro ao criar Tiposigla:", error);
        });
    })
    .catch(error => {
        console.error("Erro ao inserir Situacaosigla:", error);
    });
})
.catch(error => {
    console.error("Erro ao criar Situacaosigla:", error);
})
});
});
