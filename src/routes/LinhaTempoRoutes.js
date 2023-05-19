//Novo
const express = require('express');
const router = express.Router();
const LinhaTempoController = require('../controllers/LinhaTempoController');

router.get('/', LinhaTempoController.listarLinhaTempo);
router.get('/:id', LinhaTempoController.obterLinhaTempo);
router.post('/', LinhaTempoController.adicionarLinhaTempo);
router.put('/:id', LinhaTempoController.atualizarLinhaTempo);
router.delete('/:id', LinhaTempoController.removerLinhaTempo);

module.exports = router;


//São as rotas da API da linha do tempo dos arquivos. Ele define os verbos HTTP necessários para cada uma das operações CRUD (Create, Read, Update, Delete) da linha do tempo.

//O primeiro comando cria um objeto router a partir do Express, que será usado para criar as rotas. Em seguida, para cada rota da API, é //definido um verbo HTTP e um handler, que será responsável por processar a requisição e enviar uma resposta.

//As rotas definidas neste trecho de código são:

//GET /: busca todas as linhas do tempo de arquivos. Chama o método listarLinhaTempo do linhaTempoController.
//GET /:id: busca uma linha do tempo de arquivo específica pelo seu ID. Chama o método obterLinhaTempo do linhaTempoController.
//POST /: cria uma nova linha do tempo de arquivo. Chama o método adicionarLinhaTempo do linhaTempoController.
//PUT /:id: atualiza uma linha do tempo de arquivo existente pelo seu ID. Chama o método atualizarLinhaTempo do linhaTempoController.
//DELETE /:id: remove uma linha do tempo de arquivo existente pelo seu ID. Chama o método removerLinhaTempo do linhaTempoController.

//Cada uma dessas rotas chama um método correspondente no controller da linha do tempo (linhaTempoController), que é responsável por manipular //os dados da linha do tempo de arquivos e enviar a resposta adequada ao cliente.