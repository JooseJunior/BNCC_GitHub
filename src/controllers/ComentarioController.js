//Novo
const Comentario = require('../models/Comentario');

// Função para criar um novo comentário
const criarComentario = async (req, res) => {
  try {
    const comentario = new Comentario(req.body);
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
