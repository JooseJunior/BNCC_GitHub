import Grupo from "../models/Grupo.js";

export default class GrupoController{
    static cadastrarGrupo = async (req, res) => {
        try {
            const grupo = new Grupo(req.body); //Pega o corpo da requisição

            if(usuario.nome.length < 3){ //Valida o nome do grupo
                return res.status(400).json({error: true, code: 400, message: "Nome deve ter pelo menos 3 caracteres"});
            }

            await grupo.save(); // Espera salvar o grupo para prosseguir (await demanda o async)
            return res.status(201).json({message: "Grupo cadastrado com sucesso"});

        } catch (error){
            return res.status(500).json({error: true, code: 500, message:"Erro interno do servidor"});
        }
    }
    static listarGrupo = async (req, res) => {
        try{
            const nome = req.query.nome;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            }
            
            if(nome){
                const grupos = await Grupo.paginate({nome: new RegExp(nome, "i")},options)
                return res.status(200).json(grupos);
            }
            const grupos = await Grupo.paginate({},options);
            return res.status(200).json(grupos);

        }catch(error){
            return res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }

    static listarGrupoPorId = async (req, res) => {
        try {
          const id = req.params.id;
    
          if (id) {
            const grupo = await Grupo.findById(id);
    
            if (!grupo) {
              return res.status(404).json({code:404, message: "Grupo não encontrado"})
            }

            return res.status(200).json(grupo)
          }
    
        } catch (error) {
          res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }
}