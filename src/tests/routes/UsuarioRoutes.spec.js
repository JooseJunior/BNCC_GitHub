//JOSE
import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";
import faker from 'faker-br';

// ROTAS QUE TENHO QUE TESTAR
/* 
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .get("/usuarios", UsuarioController.listarUsuario)
    .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
    .put("/usuarios/:id", UsuarioController.atualizarUsuario)
    .patch("/usuarios/:id", UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", UsuarioController.excluirUsuario)
*/

let server

beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

afterAll(() => {
    mongoose.connection.close();
});

/*
describe ('Autenticação', () => {
      it("Deve receber um token de um usuário válido", async () => {
        const dados = await request(app)
        .post('/login')
        .send({
            email: "4190451Rynaldo.Carvalho@live.com",
            senha:"123"
        })
        .set('Accept', 'aplication/json')
        .expect(200);
        expect(dados._body.user.email).toEqual("4190451Rynaldo.Carvalho@live.com")
        token = dados._body.token;
    });
});
*/

const nome = "Jose"
const nome_meio = "Silva"
const sobrenome = "Nascimento"
const email = `${nome}.${sobrenome}@hotmail.com`

const userTest = {
    nome: `${nome} ${nome_meio} ${sobrenome}`,
    email: email,
    senha: 12345678,
    ativo: true,
    grupos: [{}],
    rotas: [{}]
}

describe('SuperTest de Usuários', () => {
    let usuarioId;
    it("Deve cadastrar um usuário", async () => {
        const dados = await request(app)
            .post('/usuarios')
            .send(userTest)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(201)

        expect(dados.body.nome).toEqual(userTest.nome)
        expect(dados.body.email).toEqual(userTest.email)

        usuarioId = dados.body._id; //Armazena o id que foi criado, para obter o Id 
    });

    it("Deve retornar uma lista de usuários", async () => {
        const dados = await request(app)
            .get('/usuarios')                       // Rotas consultada no teste
            .set('Accept', 'aplication/json')       //Tipos de arquivos aceitos
            .expect('content-type', /json/)         //Passando arquivo Json
            .expect(200);                           //Resultado esperado

        console.log(dados.body.docs.length);
        // expect(dados._body.docs[1].nome).toEqual('Srta. Eddy Melo');
        expect(dados.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma lista usuário por ID", async () => {
        const dados = await request(app)
            .get(`/usuarios/${usuarioId}`)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200)

        expect(dados.body._id).toEqual(usuarioId)
        expect(dados.body.nome).toEqual(userTest.nome)
        expect(dados.body.email).toEqual(userTest.email)
    })

    it("Deve atualizar um usuário - Completo [PUT]", async () => {
        const userNovo = {
            nome: "Novo Usuário",
            email: "novo.email@gmail.com",
            senha: 12345678,
            ativo: true,
            grupos: [],
            rotas: []
        }

        const dados = await request(app)
            .put(`/usuarios/${usuarioId}`) //Determina a rota
            .send(userNovo) //Atualiza dados Completo
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200)

        expect(dados.body._id).toEqual(usuarioId)
        expect(dados.body.nome).toEqual(userNovo.nome)
        expect(dados.body.email).toEqual(userNovo.email)
    });

    it("Deve atualizar um usuário - Parcial [PATCH]", async () => {
        const novoNome = "José Júnior"

        const dados = await request(app)
            .patch(`/usuarios/${usuarioId}`) //Determina a rota
            .send({ nome: novoNome }) //Atualiza dados Parcial (Nome Somente)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200)

        expect(dados.body._id).toEqual(usuarioId)
        expect(dados.body.nome).toEqual(novoNome)
    });

    it("Deve deletar um usuário", async () => {
        const dados = await request(app)

            .delete(`/usuarios/${usuarioId}`)
            .set('Accept', 'aplication/json')
            .expect(204)

        const resposta = await request(app)
            .get(`/usuarios/${usuarioId}`)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(404)

        expect(resposta.body.error).toBe(true)
        expect(resposta.body.code).toEqual(404)
        expect(resposta.body.message).toEqual("Usuário invalido")
    })


})