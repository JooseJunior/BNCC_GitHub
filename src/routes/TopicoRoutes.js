//GUSTAVO
import express from "express";
import TopicoController from "../controllers/TopicoController.js";
import mongoose from "mongoose";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .post("/topicos", TopicoController.cadastrarTopico)
    .get("/topicos", TopicoController.listarTopicos)
    .get("/topicos/:id", TopicoController.listarTopicoPorId)
    
/* const topicoSchema = new mongoose.Schema({
}, { versionKey: false }); */
      
/* const Topico = mongoose.model("Topico", topicoSchema); */
      
export default router;