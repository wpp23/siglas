import express from "express";
import AuthController from "../Controllers/AuthController.js";
import SistemaSigla from "../controllers/SistemaSiglaController.js";
import AreaResponsavel from "../controllers/AreaResponsavelController.js";
import TipoSistema from "../controllers/TipoSistemaController.js";
import SituacaoSistema from "../controllers/SituacaoSistemaController.js";
import Usuario from "../Controllers/UsuarioController.js";


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

//Rotas de SistemaSigla
router.get("/api/sistemasigla", AuthController.checkToken, SistemaSigla.getAll);
router.get("/api/sistemasigla?", AuthController.checkToken, SistemaSigla.getByFilter);
router.get("/api/sistemasigla/:id", AuthController.checkToken, SistemaSigla.getById);
router.post("/api/sistemasigla", AuthController.checkToken, SistemaSigla.post);
router.put("/api/sistemasigla/:id", AuthController.checkToken, SistemaSigla.put);
router.delete("/api/sistemasigla/:id", AuthController.checkToken, SistemaSigla.del);

//Rotas de AreaResponsavel
router.get("/api/arearesponsavel", AuthController.checkToken, AreaResponsavel.getAll);
router.get("/api/arearesponsavel/:id", AuthController.checkToken, AreaResponsavel.getById);
router.post("/api/arearesponsavel", AuthController.checkToken, AreaResponsavel.post);
router.put("/api/arearesponsavel/:id", AuthController.checkToken, AreaResponsavel.put);
router.delete("/api/arearesponsavel/:id", AuthController.checkToken, AreaResponsavel.del);

//Rotas de TipoSistema
router.get("/api/tiposistema", TipoSistema.getAll);
router.get("/api/tiposistema/:id", TipoSistema.getById);
router.post("/api/tiposistema", TipoSistema.post);
router.put("/api/tiposistema/:id", TipoSistema.put);
router.delete("/api/tiposistema/:id", TipoSistema.del);

//Rotas de SituacaoSistema
router.get("/api/situacaosistema", SituacaoSistema.getAll);
router.get("/api/situacaosistema/:id", SituacaoSistema.getById);
router.post("/api/situacaosistema", SituacaoSistema.post);
router.put("/api/situacaosistema/:id", SituacaoSistema.put);
router.delete("/api/situacaosistema/:id", SituacaoSistema.del);

//Rotas de seg_Usuarios
router.get("/api/usuario", AuthController.checkToken, Usuario.getAll);
router.get("/api/usuario/:id", AuthController.checkToken, Usuario.getById);
router.post("/api/usuario", AuthController.checkToken, Usuario.post);
router.put("/api/usuario/:id", AuthController.checkToken, Usuario.put);
router.delete("/api/usuario/:id", AuthController.checkToken, Usuario.del);



export default router;