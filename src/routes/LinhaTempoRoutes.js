import express from "express";
import LinhaTempoController from "../controllers/LinhaTempoController.js";

const router = express.Router();

router.get('/linhatempo', LinhaTempoController.listarLinhaTempo);
router.get('/linhatempo/:id', LinhaTempoController.obterLinhaTempo);
router.post('/linhatempo', LinhaTempoController.adicionarLinhaTempo);
router.put('/linhatempo/:id', LinhaTempoController.atualizarLinhaTempo);
router.delete('/linhatempo/:id', LinhaTempoController.removerLinhaTempo);

export default router;
