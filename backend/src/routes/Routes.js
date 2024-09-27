import express from "express";
import AuthController from "../Controllers/AuthController.js";
import Sigla from "../Controllers/SiglaController.js";
import AreaResponsavel from "../controllers/AreaResponsavelController.js";
import TipoSigla from "../controllers/TipoSiglaController.js";
import SituacaoSigla from "../controllers/SituacaoSiglaController.js";
import Usuario from "../Controllers/UsuarioController.js";
import TecnologiaSigla from "../Controllers/TecnologiaSiglaController.js";
import VersaoTecnologia from "../Controllers/VersaoTecnologiaController.js";
import AmbienteSigla from "../Controllers/AmbienteSiglaController.js"; // Importe o controlador


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
router.get("/api/sigla", AuthController.checkToken, Sigla.getAll);
router.get("/api/sigla?", AuthController.checkToken, Sigla.getByFilter);
router.get("/api/sigla/:id", AuthController.checkToken, Sigla.getById);
router.post("/api/sigla", AuthController.checkToken, Sigla.post);
router.put("/api/sigla/:id", AuthController.checkToken, Sigla.put);
router.delete("/api/sigla/:id", AuthController.checkToken, Sigla.del);

//Rotas de AreaResponsavel
router.get("/api/arearesponsavel", AuthController.checkToken, AreaResponsavel.getAll);
router.get("/api/arearesponsavel/:id", AuthController.checkToken, AreaResponsavel.getById);
router.post("/api/arearesponsavel", AuthController.checkToken, AreaResponsavel.post);
router.put("/api/arearesponsavel/:id", AuthController.checkToken, AreaResponsavel.put);
router.delete("/api/arearesponsavel/:id", AuthController.checkToken, AreaResponsavel.del);

//Rotas de TipoSigla
router.get("/api/tiposigla", TipoSigla.getAll);
router.get("/api/tiposigla/:id", TipoSigla.getById);
router.post("/api/tiposigla", TipoSigla.post);
router.put("/api/tiposigla/:id", TipoSigla.put);
router.delete("/api/tiposigla/:id", TipoSigla.del);

//Rotas de SituacaoSigla
router.get("/api/situacaosigla", SituacaoSigla.getAll);
router.get("/api/situacaosigla/:id", SituacaoSigla.getById);
router.post("/api/situacaosigla", SituacaoSigla.post);
router.put("/api/situacaosigla/:id", SituacaoSigla.put);
router.delete("/api/situacaosigla/:id", SituacaoSigla.del);

//Rotas de seg_Usuarios
router.get("/api/usuario", AuthController.checkToken, Usuario.getAll);
router.get("/api/usuario/:id", AuthController.checkToken, Usuario.getById);
router.post("/api/usuario", AuthController.checkToken, Usuario.post);
router.put("/api/usuario/:id", AuthController.checkToken, Usuario.put);
router.delete("/api/usuario/:id", AuthController.checkToken, Usuario.del);

//Rotas de TecnologiaSigla
router.get("/api/tecnologiasigla", AuthController.checkToken, TecnologiaSigla.getAll);
router.get("/api/tecnologiasigla/:id", AuthController.checkToken, TecnologiaSigla.getById);
router.post("/api/tecnologiasigla", AuthController.checkToken, TecnologiaSigla.post);
router.put("/api/tecnologiasigla/:id", AuthController.checkToken, TecnologiaSigla.put);
router.delete("/api/tecnologiasigla/:id", AuthController.checkToken, TecnologiaSigla.del);

//Rotas de VersaoTecnologia
router.get("/api/versaotecnologia", AuthController.checkToken, VersaoTecnologia.getAll);
router.get("/api/versaotecnologia/:id", AuthController.checkToken, VersaoTecnologia.getById);
router.post("/api/versaotecnologia", AuthController.checkToken, VersaoTecnologia.post);
router.put("/api/versaotecnologia/:id", AuthController.checkToken, VersaoTecnologia.put);
router.delete("/api/versaotecnologia/:id", AuthController.checkToken, VersaoTecnologia.del);

// Rotas para AmbienteSigla
router.get("/api/ambientesigla", AuthController.checkToken, AmbienteSigla.getAll);
router.get("/api/ambientesigla/:id", AuthController.checkToken, AmbienteSigla.getById);
router.post("/api/ambientesigla", AuthController.checkToken, AmbienteSigla.post);
router.put("/api/ambientesigla/:id", AuthController.checkToken, AmbienteSigla.put);
router.delete("/api/ambientesigla/:id", AuthController.checkToken, AmbienteSigla.del);


export default router;
