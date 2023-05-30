//GUSTAVO
import express from "express";
import TopicoController from "../controllers/TopicoController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .post("/topicos", TopicoController.cadastrarTopico)
    .get("/topicos", TopicoController.listarTopicos)
    .get("/topicos/:id", TopicoController.listarTopicoPorId)
    .patch("/topicos/:id", TopicoController.atualizarTopico)
      
export default router;