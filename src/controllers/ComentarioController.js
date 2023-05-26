//Novo
const Comentario = require('../models/Comentario');

// Função para criar um novo comentário
const criarComentario = async (req, res) => {
  try {
    const comentario = new Comentario(req.body.comentario);
    await comentario.save();
    res.status(201).json({ message: 'Comentário criado com sucesso!', comentario });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar comentário.', error });
  }
};

// Função para listar todos os comentários de um post
const listarComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find({ postId: req.params.postId });
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao listar comentários.', error });
  }
};

// Função para atualizar um comentário
const atualizarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndUpdate(
      req.params.comentarioId,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Comentário atualizado com sucesso!', comentario });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar comentário.', error });
  }
};

// Função para excluir um comentário
const excluirComentario = async (req, res) => {
  try {
    await Comentario.findByIdAndDelete(req.params.comentarioId);
    res.status(200).json({ message: 'Comentário excluído com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao excluir comentário.', error });
  }
};

// Função para dar like em um comentário
const darLikeComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndUpdate(
      req.params.comentarioId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.status(200).json({ message: 'Like adicionado ao comentário!', comentario });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao dar like no comentário.', error });
  }
};

module.exports = {
  criarComentario,
  listarComentarios,
  atualizarComentario,
  excluirComentario,
  darLikeComentario
};



//criarComentario: esta função cria um novo comentário a partir dos dados enviados pelo usuário no corpo da solicitação HTTP. Ela utiliza o modelo Comentario do banco de dados MongoDB através do método save() para salvar o novo comentário no banco de dados. Em caso de sucesso, retorna uma resposta HTTP com status 201 (criado) e o comentário criado no corpo da resposta. Em caso de falha, retorna uma resposta HTTP com status 400 (bad request) e uma mensagem de erro no corpo da resposta.


//listarComentarios: esta função retorna uma lista de todos os comentários associados a um post específico, que é identificado pelo parâmetro postId na solicitação HTTP. Ela utiliza o modelo Comentario do banco de dados MongoDB através do método find() para buscar todos os comentários com o postId informado. Em caso de sucesso, retorna uma resposta HTTP com status 200 (ok) e a lista de comentários no corpo da resposta. Em caso de falha, retorna uma resposta HTTP com status 400 (bad request) e uma mensagem de erro no corpo da resposta.


//atualizarComentario: esta função atualiza um comentário existente no banco de dados com base no ID do comentário fornecido no parâmetro comentarioId. Ela utiliza o modelo Comentario do banco de dados MongoDB através do método findByIdAndUpdate() para encontrar e atualizar o comentário com os novos dados enviados pelo usuário no corpo da solicitação HTTP. Em caso de sucesso, retorna uma resposta HTTP com status 200 (ok) e o comentário atualizado no corpo da resposta. Em caso de falha, retorna uma resposta HTTP com status 400 (bad request) e uma mensagem de erro no corpo da resposta.


//excluirComentario:esta função exclui um comentário existente do banco de dados com base no ID do comentário fornecido no parâmetro comentarioId. Ela utiliza o modelo Comentario do banco de dados MongoDB através do método findByIdAndDelete() para encontrar e excluir o comentário com o comentarioId informado. Em caso de sucesso, retorna uma resposta HTTP com status 200 (ok) e uma mensagem de confirmação no corpo da resposta. Em caso de falha, retorna uma resposta HTTP com status 400 (bad request) e uma mensagem de erro no corpo da resposta.


//darLikeComentario: esta função adiciona um "like" (ou curtida) a um comentário existente no banco de dados com base no ID do comentário fornecido no parâmetro comentarioId. Ela utiliza o modelo Comentario do banco de dados MongoDB através do método findByIdAndUpdate() para encontrar e atualizar o comentário com um incremento de 1 no campo likes. Em caso de sucesso, retorna uma resposta HTTP com status 200 (ok) e o comentário atualizado no corpo da resposta. Em caso de falha, retorna uma resposta HTTP com status 400 (bad request) e uma mensagem de erro no corpo da resposta.

