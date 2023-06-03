//GUSTAVO
import express from "express";
import TopicoController from "../controllers/TopicoController.js";
import AuthMiddleware from "../middlewares/AuthMidleware.js";

const router = express.Router();

router
    .post("/topicos", AuthMiddleware, TopicoController.cadastrarTopico)
    .get("/topicos", AuthMiddleware, TopicoController.listarTopicos)
    .get("/topicos/:id", AuthMiddleware, TopicoController.listarTopicoPorId)
    .patch("/topicos/:id", AuthMiddleware, TopicoController.atualizarTopico)
      
export default router;