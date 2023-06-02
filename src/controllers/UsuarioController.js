import Usuario from "../models/Usuario.js";

export default class UsuarioController{
    static cadastrarUsuario = async (req, res) => {
        try {
            // Cria o novo usuário
            const usuario = new Usuario(req.body);
            
            // Validação de Usuário: Quantidade minima de caracteres
            if(usuario.nome.length < 3){ 
                return res.status(400).json({error: true, code: 400, message: "Nome deve ter pelo menos 3 caracteres"});
            }

            // Realiza o cadastro
            const usuarioSalvo = await usuario.save()
            //await usuario.save()
            return res.status(201).json(usuarioSalvo);

        } catch (error){
              console.log(error)
              return res.status(500).json({error: true, code: 500, message:"Erro interno do servidor"});
        }
    }

    static atualizarUsuario = async (req, res) => {
        try {
            // Cria o novo usuário e identifica o Id
            const {id} = req.params;
            const {nome, email, senha, ativo} = req.body;
            
            // Realiza a Atualização
            const atualizarUsuario = await Usuario.findByIdAndUpdate(id, {nome, email, senha, ativo}, {new: true});

            //Verifica se o ID não foi localizado
            if (!atualizarUsuario){
                return res.status(404).json({error: true, code: 404, message: "Usuário não encontrado"})
            }
            
            return res.status(200).json(atualizarUsuario) //Nome do usuário atualizado
            //return res.status(200).json({message: "Usuário atualizado com sucesso"}) // Mensagem atualizado

        } catch (err) {
          //console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
    }
    
    static excluirUsuario = async (req, res) => {
        try {
            // Identificação do ID
            const {id} = req.params;

            // Realiza a exclusão
            const usuarioRemovido = await Usuario.findByIdAndRemove(id);

            // Validação de ID: Verificar se um ID foi requisitado
            if (!usuarioRemovido) {
              return res.status(404).json({ error: true, code: 404, message: "ID inválido" })
            }

            // Validação de Usuário: Verificar se Usuário logado está excluindo-se
            if (id === req.user_id) {
              return res.status(401).json({ code: 401, message: "Usuário logado não pode excluir a si próprio!" })
            }

            // Remoção realizada com sucesso
            return res.status(204).json({ message: "Usuário removido com sucesso" });

        } catch (err) {
          //console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
      }

    static listarUsuario = async (req, res) => {
        try{
            const nome = req.query.nome;
            const email = req.query.email;
            const page = req.query.page;
            const perPage = req.query.perPage;

            //Limitar a quantidade máxima por requisição
            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 20 ? 20 : parseInt(perPage) || 20
            }

            //Se passou nome, retorna o nome requisitado
            if(nome){
                const usuarios = await Usuario.paginate({nome: new RegExp(nome, "i")},options)
                return res.status(200).json(usuarios);
            }

            //Se passou email, retorna o email requisitado
            if(email){
                const usuarios = await Usuario.paginate({email: new RegExp(email, "i")},options)
                return res.status(200).json(usuarios);
            }

            //Se passou nome e email, retorna nome e email requisitado
            if(nome && email){
              const usuarios = await Usuario.paginate({$and: [{nome: new RegExp(nome, "i"), email: new RegExp(email, "i") }]},options)
              return res.status(200).json(usuarios);
            }

            //Retorna a busca completa
            const usuarios = await Usuario.paginate({},options);
            return res.status(200).json(usuarios);

        }catch(error){
            return res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }

    static listarUsuarioPorId = async (req, res) => {
        try {
            // Identificação do ID
            const id = req.params.id;
            const usuario = await Usuario.findById(id);

            // Validação de Usuário: Verificar se ID requisitado existe
            if (!usuario) {
              return res.status(404).json({error: true, code: 404, message: "Usuário invalido" })
            }
            
            //Retorna o usuário requisitado
            return res.status(200).json(usuario)
        
        } catch (error) {
            //console.error(err);
            res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }
}