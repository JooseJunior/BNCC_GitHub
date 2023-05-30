//JOSE
import Grupo from "../models/Grupo.js";

export default class GrupoController{
    static cadastrarGrupo = async (req, res) => {
        try {
            //Pega o corpo da requisição
            const grupo = new Grupo(req.body);
            
            //Valida o nome do grupo antes de salvar
            if(usuario.nome.length < 3){ 
                return res.status(400).json({error: true, code: 400, message: "Nome deve ter pelo menos 3 caracteres"});
            }

            //Cadastrando o grupo
            await grupo.save((err) => {
                if (!err) {
                    return res.status(201).send({ grupo: grupo.toJSON(), message: "Grupo cadastrado com sucesso!" });
                } else {
                    res.status(500).send({ message: `Falha ao cadastrar grupo: ${err.message}`});
                }
              })

        } catch (error){
            // console.error(err);
            return res.status(500).json({error: true, code: 500, message:"Erro interno do servidor"});
        }
    }

    static atualizarGrupo = async (req, res) => {
        try {
            //Pega o ID da requisição, para atualização do grupo
            const id = req.params.id; 
            
            //Atualizando o grupo
            await grupo.findByIdAndUpdate(id, { $set: req.body }, (err) => {
              if (!err) {
                res.status(200).send({ message: 'Grupo atualizado com sucesso' })
              } else {
                res.status(500).send({ message: `Falha ao atualizar grupo: ${err.message}` })
              }
            }).clone().catch((err) => { console.log(err) }) // Copia objeto 'grupo' antes de atualizá-lo e captura eventual erro

        } catch (err) {
            // console.error(err);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
    }

    static excluirGrupo = async (req, res) => {
        try {
            //Pega o ID da requisição, para exclusão do grupo
            const id = req.params.id;
            
            //Deletando o grupo
            await grupo.findByIdAndDelete(id, (err) => {
              if (!err) {
                res.status(200).send({ message: 'Grupo removido com sucesso' })
              } else {
                res.status(500).send({ message: `Falha ao excluir grupo: ${err.message}`})
              }
            })

        } catch (err) {
          // console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
    }

    static listarGrupo = async (req, res) => {
        try{
            const nome = req.query.nome;
            const page = req.query.page;
            const perPage = req.query.perPage;
            
            //Limitar a quantidade máxima por requisição
            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            };
            

            //Grupo validado
            if(nome){
                const grupos = await Grupo.paginate({nome: new RegExp(nome, "i")},options)
                return res.status(200).json(grupos);
            }

            //Não validado
            const grupos = await Grupo.paginate({},options);
            return res.status(200).json(grupos);
            
        }catch(error){
            // console.error(err);
            return res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }

    static listarGrupoPorId = async (req, res) => {
        try {
            //Pega o ID da requisição, para listagem do grupo
            const id = req.params.id;
            
            if(!id){
                return res.status(404).json({code:404, message: "ID não identificado"})
            }

            if (id) {
                const grupo = await Grupo.findById(id);
                
                if (!grupo) {
                return res.status(404).json({code:404, message: "Grupo não encontrado"})
                }

                return res.status(200).json(grupo) // Grupo identificado com Sucesso!
            }
            
        } catch (error) {
            // console.error(err);
            res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }
}