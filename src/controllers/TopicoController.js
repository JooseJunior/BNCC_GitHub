import Topico from "../models/Topico.js";

export default class TopicoController{
    static cadastrarTopico = async (req, res) => {
        try {
            const topico = new Topico(req.body); //Pega o corpo da requisição

            if(topico.titulo.length < 3){ //Valida o nome do topico
                return res.status(400).json({error: true, code: 400, message: "Titulo deve ter pelo menos 3 caracteres"});
            }

            await topico.save(); // Espera salvar o topico para prosseguir (await demanda o async)
            return res.status(201).json({message: "Topico cadastrado com sucesso"});

        } catch (error){
            console.log(error)
            return res.status(500).json({error: true, code: 500, message:"Erro interno do servidor"});
        }
    }
    static listarTopicos = async (req, res) => {
        try{
            const titulo = req.query.titulo;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            }
            
            if(titulo){
                const topicos = await Grupo.paginate({titulo: new RegExp(titulo, "i")},options)
                return res.status(200).json(topicos);
            }
            const topicos = await Topico.paginate({},options);
            return res.status(200).json(topicos);

        }catch(error){
            return res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }

    static listarTopicoPorId = async (req, res) => {
        try {
          const id = req.params.id;
    
          if (id) {
            const topico = await Topico.findById(id);
    
            if (!topico) {
              return res.status(404).json({code:404, message: "Topico não encontrado"})
            }

            return res.status(200).json(topico)
          }
    
        } catch (error) {
          res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }
}