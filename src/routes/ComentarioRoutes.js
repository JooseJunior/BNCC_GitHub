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


//A primeira rota definida no código é uma rota POST para criar um novo comentário, que será processada pelo método criarComentario do ComentarioController.

//A segunda rota é uma rota GET para obter uma lista de todos os comentários de um post específico, que será processada pelo método listarComentarios do ComentarioController. Essa rota espera um parâmetro postId na URL.

//A terceira rota é uma rota PUT para atualizar um comentário existente, que será processada pelo método atualizarComentario do ComentarioController. Essa rota espera um parâmetro comentarioId na URL.

//A quarta rota é uma rota DELETE para excluir um comentário existente, que será processada pelo método excluirComentario do ComentarioController. Essa rota espera um parâmetro comentarioId na URL.

//A última rota é uma rota POST para dar um like em um comentário específico, que será processada pelo método darLikeComentario do ComentarioController. Essa rota espera dois parâmetros na URL: comentarios e comentarioId.
