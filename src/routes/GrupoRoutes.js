//JOSE
import express from "express";
import GrupoController from "../controllers/GrupoController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router

    .post("/grupos", GrupoController.cadastrarGrupo)
    .put("/grupos/:id", GrupoController.atualizarGrupo)
    .patch("/grupos/:id", GrupoController.atualizarGrupo)
    .delete("/grupos/:id", GrupoController.excluirGrupo)
    .get("/grupos", GrupoController.listarGrupo)
    .get("/grupos/:id", GrupoController.listarGrupoPorId)

export default router;