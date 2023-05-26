//VINICIUS
import express from "express";
import LinhaTempoController from "../controllers/LinhaTempoController.js";

const router = express.Router();

router.post('/documentos', LinhaTempoController.AdicionarDocumento);
router.get('/linha-do-tempo', LinhaTempoController.obterLinhaTempo);
router.put('/documentos/:id', LinhaTempoController.atualizarDocumento);
router.delete('/documentos/:id', LinhaTempoController.removerDocumento);

export default router;