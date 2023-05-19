import Usuario from "../models/Usuario.js";

export default class UsuarioController{
    static cadastrarUsuario = async (req, res) => {
        try {
            const usuario = new Usuario(req.body); //Pega o corpo da requisição

            if(usuario.nome.length < 3){ //Valida o nome do usuarios
                return res.status(400).json({error: true, code: 400, message: "Nome deve ter pelo menos 3 caracteres"});
            }

            await usuario.save(); // Espera salvar o usuário para prosseguir (await demanda o async)
            return res.status(201).json({message: "Usuário cadastrado com sucesso"});

        } catch (error){
            console.log(error)
            return res.status(500).json({error: true, code: 500, message:"Erro interno do servidor"});
        }
    }
    static listarUsuario = async (req, res) => {
        try{
            const nome = req.query.nome;
            const email = req.query.email;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            }
            
            if(nome){
                const usuarios = await Usuario.paginate({nome: new RegExp(nome, "i")},options)
                return res.status(200).json(usuarios);
            }
            if(email){
                const usuarios = await Usuario.paginate({email: new RegExp(email, "i")},options)
                return res.status(200).json(usuarios);
            }
            if(nome && email){
                const usuarios = await Usuario.paginate({$and: [{nome: new RegExp(nome, "i"), email: new RegExp(email, "i") }]},options)
                return res.status(200).json(usuarios);
            }

            const usuarios = await Usuario.paginate({},options);
            return res.status(200).json(usuarios);

        }catch(error){
            return res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }

    static listarUsuarioPorId = async (req, res) => {
        try {
          const id = req.params.id;
    
          if (id) {
            const usuario = await Usuario.findById(id);
    
            if (!usuario) {
              return res.status(404).json({code:404, message: "Usuário não encontrado"})
            }

            return res.status(200).json(usuario)
          }
    
        } catch (error) {
          res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }
}