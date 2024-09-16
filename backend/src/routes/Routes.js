import express from "express";
import AuthController from "../Controllers/AuthController.js";
import Sigla from "../Controllers/SiglaController.js";
import AreaResponsavel from "../controllers/AreaResponsavelController.js";
import TipoSigla from "../controllers/TipoSiglaController.js";
import SituacaoSigla from "../controllers/SituacaoSiglaController.js";
import Usuario from "../Controllers/UsuarioController.js";
import TecnologiaSigla from "../Controllers/TecnologiaSiglaController.js";
import VersaoTecnologia from "../Controllers/VersaoTecnologiaController.js";


const router = express.Router();

//Rota raiz
router.get("/", (req, res)=>{
    console.log('Api running');
    res.status(200).json({ message: 'Api running'})
});
router.get("/api", (req, res)=>{
    console.log('Api running');
    res.status(200).json({ message: 'Api running'})
});


//Rota de Authentication
router.post("/api/login", AuthController.login);

//Rotas de Sigla
router.get("/api/Sigla", AuthController.checkToken, Sigla.getAll);
router.get("/api/Sigla?", AuthController.checkToken, Sigla.getByFilter);
router.get("/api/Sigla/:id", AuthController.checkToken, Sigla.getById);
router.post("/api/Sigla", AuthController.checkToken, Sigla.post);
router.put("/api/Sigla/:id", AuthController.checkToken, Sigla.put);
router.delete("/api/Sigla/:id", AuthController.checkToken, Sigla.del);

//Rotas de AreaResponsavel
router.get("/api/arearesponsavel", AuthController.checkToken, AreaResponsavel.getAll);
router.get("/api/arearesponsavel/:id", AuthController.checkToken, AreaResponsavel.getById);
router.post("/api/arearesponsavel", AuthController.checkToken, AreaResponsavel.post);
router.put("/api/arearesponsavel/:id", AuthController.checkToken, AreaResponsavel.put);
router.delete("/api/arearesponsavel/:id", AuthController.checkToken, AreaResponsavel.del);

//Rotas de TipoSigla
router.get("/api/tipoSigla", TipoSigla.getAll);
router.get("/api/tipoSigla/:id", TipoSigla.getById);
router.post("/api/tipoSigla", TipoSigla.post);
router.put("/api/tipoSigla/:id", TipoSigla.put);
router.delete("/api/tipoSigla/:id", TipoSigla.del);

//Rotas de SituacaoSigla
router.get("/api/situacaoSigla", SituacaoSigla.getAll);
router.get("/api/situacaoSigla/:id", SituacaoSigla.getById);
router.post("/api/situacaoSigla", SituacaoSigla.post);
router.put("/api/situacaoSigla/:id", SituacaoSigla.put);
router.delete("/api/situacaoSigla/:id", SituacaoSigla.del);

//Rotas de seg_Usuarios
router.get("/api/usuario", AuthController.checkToken, Usuario.getAll);
router.get("/api/usuario/:id", AuthController.checkToken, Usuario.getById);
router.post("/api/usuario", AuthController.checkToken, Usuario.post);
router.put("/api/usuario/:id", AuthController.checkToken, Usuario.put);
router.delete("/api/usuario/:id", AuthController.checkToken, Usuario.del);

//Rotas de TecnologiaSigla
router.get("/api/tecnologiaSigla", AuthController.checkToken, TecnologiaSigla.getAll);
router.get("/api/tecnologiaSigla/:id", AuthController.checkToken, TecnologiaSigla.getById);
router.post("/api/tecnologiaSigla", AuthController.checkToken, TecnologiaSigla.post);
router.put("/api/tecnologiaSigla/:id", AuthController.checkToken, TecnologiaSigla.put);
router.delete("/api/tecnologiaSigla/:id", AuthController.checkToken, TecnologiaSigla.del);

//Rotas de VersaoTecnologia
router.get("/api/versaotecnologia", AuthController.checkToken, VersaoTecnologia.getAll);
router.get("/api/versaotecnologia/:id", AuthController.checkToken, VersaoTecnologia.getById);
router.post("/api/versaotecnologia", AuthController.checkToken, VersaoTecnologia.post);
router.put("/api/versaotecnologia/:id", AuthController.checkToken, VersaoTecnologia.put);
router.delete("/api/versaotecnologia/:id", AuthController.checkToken, VersaoTecnologia.del);


export default router;
