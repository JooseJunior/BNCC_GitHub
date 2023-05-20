import express from "express";
import LinhaTempoController from "../controllers/LinhaTempoController.js";

const router = express.Router();

router.get('/', LinhaTempoController.listarLinhaTempo);
router.get('/:id', LinhaTempoController.obterLinhaTempo);
router.post('/', LinhaTempoController.adicionarLinhaTempo);
router.put('/:id', LinhaTempoController.atualizarLinhaTempo);
router.delete('/:id', LinhaTempoController.removerLinhaTempo);

export default router;
