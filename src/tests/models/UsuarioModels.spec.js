//JOSE
import { describe, expect, it, jest,} from '@jest/globals';
import Usuario from '../../models/Usuario.js'
import UsuarioController from '../../controllers/UsuarioController.js';

describe ( 'Deve retornar os testes de unidade de usuáro', () => {

    afterEach(() => jest.clearAllMocks());

    const objetoUsuario ={
        nome: 'Jose Junior',
        email: 'jose.junior@hotmail.com',
        senha: '12345678',
        ativo: true,
        grupos: [{}],
        rotas: [{}]
    };

    it('Deve Instancia um novo Usuário', () => {
        const usuario = new Usuario(objetoUsuario);

        // expect(usuario).toEqual(expect.objectContaining(objetoUsuario));
        
        expect(usuario).toHaveProperty('nome', 'Jose Junior');
    });

    /*
    métodos a serem testados do controller:
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .put("/usuarios/:id", UsuarioController.atualizarUsuario)
    .patch("/usuarios/:id", UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", UsuarioController.excluirUsuario)
    .get("/usuarios", UsuarioController.listarUsuario)
    .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
    */

/*
    it('Deve retornar o cadastroUsuario simulado com mock ', () => {
        const usuario = new Usuario(objetoUsuario);
        UsuarioController.cadastrarUsuario = jest.fn().mockReturnValue({
            nome: "Jose Junior ",
            email: "jose.junior@hotmail.com",
            senha: 12345678,
            ativo: true,
            grupos: [{}],
            rotas: [{}]
        });
        
        const retorno = UsuarioController.cadastrarUsuario();
        
        expect(retorno).toEqual(expect.objectContaining({
        
            dataNascimento: expect.any(Date),...objetoUsuario,}));
        
        expect(UsuarioController.cadastrarUsuario).toBeCalledTimes(1);
    });

    it("Deve retornar uma listarUsuario simulada com mock", () => {
        UsuarioController.listarUsuario = jest.fn().mockReturnValue(
            [{
                _id: '63f969d459942abbe89a2254',
                nome: 'Vanilda Benetti',
                email: "vanilda.benetti@hotmail.com",
                senha: 87654321,
                ativo: true,
                grupos: [{}],
                rotas: [{}]
              },
              {
                _id: '63f969d459942abbe89a2654',
                nome: 'Reinaldo Pedroso',
                email: "reinaldo.pedroso@hotmail.com",
                senha: 87654321,
                ativo: true,
                grupos: [{}],
                rotas: [{}]
              },
              {
                _id: '63f969d459942abbe89a2265',
                nome: 'Daniele Benetti',
                email: "daniele.benetti@hotmail.com",
                senha: 87654321,
                ativo: true,
                grupos: [{}],
                rotas: [{}]          
            } ]            
            );

        const retorno = UsuarioController.listarUsuarios();
        //console.log(retorno);

        expect(retorno).toHaveLength(2);
        expect(retorno[0]).toHaveProperty('nome','Vanilda Benetti');
        expect(UsuarioController.listarUsuarios).toBeCalledTimes(1);
    });


    it("Deve retornar uma listarUsuariosPorId simulada com mock", () => {
        UsuarioController.listarUsuarioPorId = jest.fn().mockReturnValue(
            {
                _id: '63f969d459942abbe89a2265',
                nome: 'Daniele Benetti',
                email: "daniele.benetti@hotmail.com",
                senha: 87654321,
                ativo: true,
                grupos: [{}],
                rotas: [{}]              
            });
        const retorno = UsuarioController.listarUsuarioPorId();
        expect(retorno.nome).toEqual("Daniele Benetti");
        expect(UsuarioController.listarUsuarioPorId).toBeCalledTimes(1);
   });

   it("Deve retornar atualização de usuario simulada com mock", () => {
    const objetoUsuarioAtualizar = {
        _id: '63f969d459942abbe89a2265',
        nome: 'Daniele Benetti',
        email: "daniele.benetti@hotmail.com",
        senha: 87654321,
        ativo: true,
        grupos: [{}],
        rotas: [{}] 
    }

    UsuarioController.atualizarUsuario = jest.fn().mockReturnValue(
        {
            message:"Cadastro atualizado com sucesso"            
        });
    const retorno = UsuarioController.atualizarUsuario();
    expect(retorno).toHaveProperty("message","Cadastro atualizado com sucesso");

    expect(UsuarioController.atualizarUsuario).toBeCalledTimes(1);
    */
});