//VINICIUS
import LinhaTempo from '../models/LinhaTempo.js';


export default class LinhaTempoController {

  //=========================Adicionando documentos=========================//

  static async AdicionarDocumento(req, res) {
    try {
      const { titulo, conteudo } = req.body;
  
      const novoDocumento = new LinhaTempo({ titulo, conteudo, criando_em:new Date() });
      await novoDocumento.save();
      
      const linhaDoTempo = await LinhaTempo.find({}).sort({criando_em:1});
     res.json({ novoDocumento, linhaDoTempo});
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao adicionar documento');
    }
  };


  //=========================Atualizando documentos=========================//

  static async atualizarDocumento(req, res) {
    try {
      const { id } = req.params;
      const { titulo, conteudo } = req.body;
  
      const documentoAtualizado = await LinhaTempo.findByIdAndUpdate(
        id,
        { titulo, conteudo },
        { new: true }
      );
  
      if (!documentoAtualizado) {
        return res.status(404).json({ error: 'Documento não encontrado' });
      }
  
      res.json(documentoAtualizado);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar documento');
    }
  }
//=========================Removendo documentos=========================//
  static async removerDocumento(req, res) {
    try {
      const { id } = req.params;
  
      const documentoRemovido = await LinhaTempo.findByIdAndDelete(id);
  
      if (!documentoRemovido) {
        return res.status(404).json({ error: 'Documento não encontrado' });
      }
  
      res.json({ mensagem: 'Documento removido com sucesso!' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao remover documento');
    }
  }
  
//=========================Obtendo Linha do Tempo=========================//

static async obterLinhaTempo(req, res) {
  try {
    const documentos = await LinhaTempo.find({}).sort({ criando_em: 1 });


    const linhaDoTempo = documentos.map((documento) => ({
      titulo: documento.titulo,
      conteudo:documento.conteudo,
      data:  `${documento.criando_em.getMonth() + 1}/${documento.criando_em.getFullYear()}`,
    }));

    res.json(linhaDoTempo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao obter a linha do tempo');
  }
};
}

