import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

router
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .put("/usuarios/:id", UsuarioController.atualizarUsuario)
    .patch("/usuarios/:id", UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", UsuarioController.excluirUsuario)
    .get("/usuarios", UsuarioController.listarUsuario)
    .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)

export default router;