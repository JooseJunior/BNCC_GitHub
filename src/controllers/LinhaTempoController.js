import LinhaTempo from '../models/LinhaTempo';

export default class LinhaTempoController {
  static async listarLinhaTempo(req, res) {
    try {
      const linhaTempo = await LinhaTempo.find().sort({ criando_em: 1 });
      res.json(linhaTempo);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async obterLinhaTempo(req, res) {
    try {
      const linhaTempo = await LinhaTempo.findById(req.params.id);
      res.json(linhaTempo);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async adicionarLinhaTempo(req, res) {
    const { topico, descricao, criando_em, atualizado_em } = req.body;
    const linhaTempo = new LinhaTempo({ topico, descricao, criando_em, atualizado_em });
    try {
      await linhaTempo.save();
      res.status(201).json(linhaTempo);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async atualizarLinhaTempo(req, res) {
    try {
      const linhaTempoAtualizada = await LinhaTempo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(linhaTempoAtualizada);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async removerLinhaTempo(req, res) {
    try {
      await LinhaTempo.findByIdAndDelete(req.params.id);
      res.json({ mensagem: 'Linha do tempo removida com sucesso!' });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

//Esse é o controller que contém funções para manipular as solicitações HTTP feitas às rotas do aplicativo para a entidade LinhaTempo. Cada função do controlador manipula uma solicitação HTTP diferente, conforme detalhado a seguir:

//listarLinhaTempo: é uma função assíncrona que lida com uma solicitação HTTP GET para a rota /. Ele lista todas as linhas do tempo presentes no banco de dados, classificadas por ordem crescente de data de publicação, e retorna um objeto JSON com as informações das linhas do tempo encontradas ou uma resposta de erro com código 500 se ocorrer um erro durante o processamento da solicitação.

// obterLinhaTempo: é uma função assíncrona que lida com uma solicitação HTTP GET para a rota /:id, onde :id é o ID da linha do tempo que se deseja obter. Ele procura a linha do tempo com o ID fornecido no banco de dados e retorna um objeto JSON com suas informações ou uma resposta de erro com código 500 se ocorrer um erro durante o processamento da solicitação.

//adicionarLinhaTempo: é uma função assíncrona que lida com uma solicitação HTTP POST para a rota /. Ele cria uma nova linha do tempo com base nos dados fornecidos na solicitação e a salva no banco de dados. Em seguida, retorna um objeto JSON com as informações da linha do tempo criada ou uma resposta de erro com código 500 se ocorrer um erro durante o processamento da solicitação.

//atualizarLinhaTempo: é uma função assíncrona que lida com uma solicitação HTTP PUT para a rota /:id, onde :id é o ID da linha do tempo que se deseja atualizar. Ele atualiza as informações da linha do tempo com o ID fornecido no banco de dados com base nos dados fornecidos na solicitação e retorna um objeto JSON com as informações da linha do tempo atualizada ou uma resposta de erro com código 500 se ocorrer um erro durante o processamento da solicitação.

// removerLinhaTempo: é uma função assíncrona que lida com uma solicitação HTTP DELETE para a rota /:id, onde :id é o ID da linha do tempo que se deseja remover. Ele remove a linha do tempo com o ID fornecido do banco de dados e retorna uma mensagem de sucesso em um objeto JSON ou uma resposta de erro com código 500 se ocorrer um erro durante o processamento da solicitação.
