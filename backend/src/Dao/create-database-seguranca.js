import {sql} from './db.js'

// Create Table SEG_Usuario
sql`
CREATE TABLE IF NOT EXISTS seg_usuario (
    idusuario SERIAL PRIMARY KEY,
    login VARCHAR(25) UNIQUE,
    indbloqueado BOOLEAN,
    pwd VARCHAR(100),
    datacriacao DATE
);
`
.then(() => {
    console.log("seg_usuario criada")

    // Insert data into SituacaoSistema
    sql`
    INSERT INTO seg_usuario (login, indbloqueado, pwd, datacriacao) VALUES ('wagnerpereira', false, '','2023-01-01');
    `
    .then(() => {
        console.log("seg_usuario inserida")

        // Create Table seg_perfil
        sql`
        CREATE TABLE IF NOT EXISTS seg_perfil (
            idperfil SERIAL PRIMARY KEY,
            descrperfil VARCHAR(100) UNIQUE,
            codperfil VARCHAR(10) NULL ,
            descrdetalhamentoperfil TEXT NULL
        );
        `
        .then(() => {
            console.log("seg_perfil criada")

            // Insert data into seg_perfil
            sql`
            INSERT INTO seg_perfil (descrperfil, codperfil, descrdetalhamentoperfil) VALUES 
            ('Cadastro de Sistemas','CAD-SIS','Possui a permissão de edição do cadastro de sistemas.'),
            ('Consulta Sistemas e Configuração','CON','Acesso básico de consulta ao Cadastro de Sistemas e Configuração.'),
            ('Configuração','CFG','Possui acesso a área de configuração do sistema (usuários, perfis)'),
            ('Administração','ADM','Possui acesso a área de administração do sistema (usuários, perfis)'),
            ('Cadastro de Pessoas','CAD-PES','Possui a permissão de edição do cadastro de pessoas.'),
            ('Consulta Pessoas','CON-PES','Acesso básico de consulta ao Cadastro de Pessoas.');
            `
            .then(() => {
                console.log("seg_perfil inserida")

                // Create Table seg_usuarioperfil
                sql`
                CREATE TABLE IF NOT EXISTS seg_usuarioperfil (
                    idusuarioperfil SERIAL PRIMARY KEY,
                    idusuario INT NOT NULL,
                    idperfil INT NOT NULL,
                    FOREIGN KEY (idusuario) REFERENCES seg_usuario(idusuario),
                    FOREIGN KEY (idperfil) REFERENCES seg_perfil(idperfil)
                );
                `
                .then(() => {
                    console.log("seg_usuarioperfil criada")

                    // Insert data into seg_usuarioperfil
                    sql`
                    INSERT INTO seg_usuarioperfil (idusuario, idperfil) VALUES 
                    (1, 4);
                    `
                    .then(() => {
                        console.log("seg_usuarioperfil inserida")

                        // Create Table seg_funcionalidade
                        sql`
                        CREATE TABLE IF NOT EXISTS seg_funcionalidade (
                            idfuncionalidade SERIAL PRIMARY KEY,
                            descrfuncionalidade VARCHAR(100) NOT NULL
                        );
                        `
                        .then(() => {
                            console.log("seg_funcionalidade criada")

                            // Insert data into seg_funcionalidade
                            sql`
                                INSERT INTO seg_funcionalidade (descrfuncionalidade) VALUES 
                                ('ctrlFuncionalidade.aspx'),
                                ('ctrlFuncionalidadePerfil.aspx'),
                                ('ctrlListaFuncionalidade.aspx'),
                                ('ctrlListaPerfil.aspx'),
                                ('ctrlListaUsuario.aspx'),
                                ('ctrlPerfil.aspx'),
                                ('ctrlUsuario.aspx'),
                                ('ctrlUsuarioPerfil.aspx'),
                                ('sqlsms.aspx'),
                                ('sglListaSistemas.aspx'),
                                ('sglSistemaSigla.aspx'),
                                ('sglGestorSistema.aspx'),
                                ('sglEquipeSistema.aspx'),
                                ('sglURLSistema.aspx'),
                                ('sglBancoDadosSistema.aspx'),
                                ('sglBaselineSistema.aspx'),
                                ('sglListaEquipePerfil.aspx'),
                                ('sglPerfil.aspx'),
                                ('sglPerfilPessoa.aspx'),
                                ('sglListaPessoa.aspx'),
                                ('sglPessoa.aspx'),
                                ('sglListaAmbienteBD.aspx'),
                                ('sglListaAreaResponsavel.aspx'),
                                ('sglListaBancoDados.aspx'),
                                ('sglListaContratoEmpresa.aspx'),
                                ('sglListaEquipes.aspx'),
                                ('sglListaPerfil.aspx'),
                                ('sglListaSchemaBD.aspx'),
                                ('sglListaSituacaoSistema.aspx'),
                                ('sglListaTecnologia.aspx'),
                                ('sglListaTipoGestorSistema.aspx'),
                                ('sglListaTipoSistema.aspx'),
                                ('sglListaTipoURLSistema.aspx'),
                                ('sglAmbienteBD.aspx'),
                                ('sglAreaResponsavel.aspx'),
                                ('sglBancoDados.aspx'),
                                ('sglContratoEmpresa.aspx'),
                                ('sglEquipe.aspx'),
                                ('sglEquipeSistemaPessoa.aspx'),
                                ('sglSchemaSistema.aspx'),
                                ('sglSituacaoSistema.aspx'),
                                ('sglTecnologia.aspx'),
                                ('sglTipoGestorSistema.aspx'),
                                ('sglTipoSistema.aspx'),
                                ('sglTipoURLSistema.aspx'),
                                ('sglPrincipal.aspx'),
                                ('sglNivelPerfil.aspx'),
                                ('sglEquipePessoa.aspx'),
                                ('sglListaGrupoEquipe.aspx'),
                                ('sglGrupoEquipe.aspx'),
                                ('sglPainelPessoas.aspx'),
                                ('sglEquipeSistemaSigla.aspx'),
                                ('sglListaTipoTecnologia.aspx'),
                                ('sglTipoTecnologia.aspx'),
                                ('sglVersaoTecnologia.aspx'),
                                ('sglTecnologiaSistema.aspx');
                            `
                            .then(() => {
                                console.log("seg_funcionalidade inserida")

                                // Create Table seg_funcionalidadeperfil
                                sql`
                                CREATE TABLE IF NOT EXISTS seg_funcionalidadeperfil (
                                    idfuncionalidadeperfil SERIAL PRIMARY KEY,
                                    idfuncionalidade INT NOT NULL,
                                    idperfil INT NOT NULL,
                                    tipoacesso VARCHAR(1) NOT NULL,
                                    FOREIGN KEY (idfuncionalidade) REFERENCES seg_funcionalidade(idfuncionalidade),
                                    FOREIGN KEY (idperfil) REFERENCES seg_perfil(idperfil)
                                );
                                `
                                .then(() => {
                                    console.log("seg_funcionalidadeperfil criada")

                                    console.log("FIM")

                                    
                                })
                                .catch(error => {
                                    console.error("Erro ao criar seg_funcionalidadeperfil:", error);
                                });
                            })
                            .catch(error => {
                                console.error("Erro ao inserir seg_funcionalidade:", error);
                            });
                        })
                        .catch(error => {
                            console.error("Erro ao criar seg_perfil:", error);
                        });
                    })
                    .catch(error => {
                        console.error("Erro ao criar seg_funcionalidade:", error);
                    });
            })
            .catch(error => {
                console.error("Erro ao inserir seg_usuarioperfil:", error);
            });
        })
        .catch(error => {
            console.error("Erro ao criar seg_perfil:", error);
        });
    })
    .catch(error => {
        console.error("Erro ao inserir seg_usuario:", error);
    });
})
.catch(error => {
    console.error("Erro ao criar seg_usuario:", error);
})
});
