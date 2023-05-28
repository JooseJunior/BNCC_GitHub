//JOSE
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

            // Validação de Usuário: Se já existe cadastro do usuário
            let userExist = await usuario.findOne({ email: req.body.email });
            if (userExist) {
              return res.status(400).json({ code: 400, message: "Usuário já cadastrado!" })
            }

            // Validação de Email: Se já existe cadastro do email
            let emailExist = await usuario.findOne({ email: req.body.email });
            if (emailExist) {
              return res.status(400).json({ code: 400, message: "E-mail já cadastrado!" })
            }

            // Criptografando a senha
            let senhaHash = bcrypt.hashSync(usuario.senha, 8); // criptografar a senha
            usuario.senha = senhaHash;  // atribuindo a senha criptografada ao usuario

            // Realiza o cadastro
            await usuario.save((err) => {
                if(!err){
                    res.status(201).send(usuario.toJSON())
                    return res.status(201).json({message: "Usuário cadastrado com sucesso"});
                }else{
                    res.status(500).send({ message: `Falha ao cadastrar usuário: ${err.message}`});
                }
            })

        } catch (error){
           //console.log(error)
            return res.status(500).json({error: true, code: 500, message:"Erro interno do servidor"});
        }
    }

    static atualizarUsuario = async (req, res) => {
        try {
            // Cria o novo usuário e identifica o Id
            var usuario = new Usuario(req.body);
            var id = req.params.id;

            // Criptografando a senha
            if (usuario.senha) {
                var senhaHash = await bcrypt.hash(usuario.senha, 8); // criptografar a senha
                req.body.senha = (senhaHash); // atualizar a senha do usuario com a criptografia

                // let senhaHash = bcrypt.hashSync(usuario.senha, 8); // criptografar a senha
                // usuario.senha = senhaHash;  // atribuindo a senha criptografada ao usuario
            }

            // Realiza a Atualização
            await Usuario.findByIdAndUpdate(id, { $set: req.body }, (err) => {
              if (!err) {
                return res.status(200).send({ message: 'Usuário atualizado com sucesso' })
              } else {
                return res.status(500).json({ error: true, code: 500, message: `Falha ao atualizar usuário: ${err.message}` })
              }
            }).clone().catch((err) => { console.log(err) })

        } catch (err) {
          //console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
    }
    static excluirUsuario = async (req, res) => {
        try {
            // Identificação do ID
            const id = req.params.id;

            // Validação de ID: Verificar se um ID foi requisitado
            if (!id) {
              return res.status(400).json({ error: true, code: 400, message: "ID inválido" })
            }
            
            // Validação de Usuário: Verificar se Usuário logado está excluindo-se
            if (id === req.user_id) {
              return res.status(401).json({ code: 401, message: "Usuário logado não pode excluir a si próprio!" })
            }
            
            // Validação de Usuário: Verificar se Usuário a ser excluido existe
            const usuario = await usuarios.findById(id);
            if (!usuario) {
              return res.status(400).json({ code: 400, message: "Usuário não localizado" })
            }

            // Realiza a exclusão
            await Usuario.findByIdAndDelete(id, (err) => {
              if (!err) {
                return res.status(200).json({ error: true, code: 200, message: "Usuário excluído com sucesso." })
              }else {
                return res.status(500).json({ error: true, code: 500, message: `Falha ao excluir usuário: ${err.message}` })
              }
            }).clone().catch((err) => { console.log(err) })

        } catch (err) {
          //console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
      }
//CONTINUAR A PARTIR DAQUI <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    static listarUsuario = async (req, res) => {
        try{
            const nome = req.query.nome;
            const email = req.query.email;
            const page = req.query.page;
            const perPage = req.query.perPage;

            //Limitar a quantidade máxima por requisição
            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
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

            // Validação de ID: Verificar se um ID foi requisitado
            if (!id) {
                return res.status(400).json({ error: true, code: 400, message: "ID não requisitado" })
            }

            // Validação de Usuário: Verificar se ID requisitado existe
            if (!usuario) {
              return res.status(400).json({ code: 400, message: "ID não corresponde a um usuário válido" })
            }
            
            //Retorna o usuário requisitado
            return res.status(200).json(usuario)
            
        
        } catch (error) {
            //console.error(err);
            res.status(500).json({error: true, code: 500, message: "Erro interno do servidor"})
        }
    }
}