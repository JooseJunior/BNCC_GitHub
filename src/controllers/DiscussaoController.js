//GUILHERME

// Importar modelos e módulos necessários
const Discussao = req('../models/Discussao');

// Definir as funções do controlador
const DiscussaoController = {
  // Obter todas as discussões
  async obterTodasAsDiscussoes(req, res) {
    try {
      const discussões = await Discussao.find();
      res.json(discussões);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao obter as discussões.' });
    }
  },

  // Criar uma nova discussão
  async criarDiscussao(req, res) {
    try {
      const { titulo, descricao } = req.body;
      const novaDiscussao = new Discussao({ titulo, descricao });
      const discussãoSalva = await novaDiscussao.save();
      res.status(201).json(discussãoSalva);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar a discussão.' });
    }
  },

  // Obter uma discussão pelo ID
  async obterDiscussaoPorId(req, res) {
    try {
      const { id } = req.params;
      const discussão = await Discussao.findById(id);
      if (discussão) {
        res.json(discussão);
      } else {
        res.status(404).json({ error: 'Discussão não encontrada.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao obter a discussão.' });
    }
  },

  // Atualizar uma discussão pelo ID
  async atualizarDiscussao(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descricao } = req.body;
      const discussãoAtualizada = await Discussao.findByIdAndUpdate(
        id,
        { titulo, descricao },
        { new: true }
      );
      if (discussãoAtualizada) {
        res.json(discussãoAtualizada);
      } else {
        res.status(404).json({ error: 'Discussão não encontrada.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar a discussão.' });
    }
  },

  // Deletar uma discussão pelo ID
  async deletarDiscussao(req, res) {
    try {
      const { id } = req.params;
      const discussãoDeletada = await Discussao.findByIdAndDelete(id);
      if (discussãoDeletada) {
        res.json({ message: 'Discussão deletada com sucesso.' });
      } else {
        res.status(404).json({ error: 'Discussão não encontrada.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao deletar a discussão.' });
    }
  }
};

// Exportar o controlador
exports = DiscussaoController;