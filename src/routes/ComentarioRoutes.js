//Novo
import express from 'express';
const router = express.Router();
import ComentarioController from '../controllers/ComentarioController';

router.post('/', ComentarioController.criarComentario);

router.get('/postId', ComentarioController.listarComentarios);

router.put('/comentarioId', ComentarioController.atualizarComentario);

router.delete('/:comentarioId', ComentarioController.excluirComentario);

router.post('comentarios/comentarioId/like', ComentarioController.darLikeComentario);

export default router;