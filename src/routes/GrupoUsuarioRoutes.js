import express from "express";
import GrupoController from "../controllers/GrupoUsuarioController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .post("/grupos", GrupoController.cadastrarGrupo)
    .get("/grupos", GrupoController.listarGrupo)
    .get("/grupos/:id", GrupoController.listarGrupoPorId)
    
export default router;