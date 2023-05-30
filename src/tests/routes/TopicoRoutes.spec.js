import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";

/*
  .get("/pessoas", AuthMidleware, pessoaController.listarPessoas)
  .get("/pessoas/:id", AuthMidleware, pessoaController.listarPessoaPorId)
  .post("/pessoas", AuthMidleware, pessoaController.cadastrarPessoa)
  .patch("/pessoas/:id", AuthMidleware, pessoaController.atualizarPessoa)
  
  */

let server
let idTopico = false;

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


describe('/GET em topicos', () => {
    it("Deve retornar uma lista de Topicos", async () => {
        const dados = await request(app)
            .get('/topicos')
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200);
        /* console.log(dados._body) */
        expect(dados._body.docs[1].titulo).toContain('Nam at adipisci esse aspernatur fugiat.');
    });
});
describe('/GET/ID em topicos', () => {
    it("Deve retornar um topico por ID ", async () => {
        const dados = await request(app)
            .get('/topicos/6473ed0d02bf02bf7d3999f6')
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200);
        /* console.log(dados._body) */
    });

    it("Deve atualizar um titulo - Parcial [PATCH]", async () => {

        const dados = await request(app)
            .patch('/topicos/64657dde77eca231e1b481ca')
            .send({ titulo: "titulo teste" }) //Atualiza dados Parcial (Nome Somente)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200)

        expect(dados.body._id).toEqual("64657dde77eca231e1b481ca")
        expect(dados.body.titulo).toEqual("titulo teste")
    });



    it("Deve retornar erro de ID invalido ", async () => {
        const dados = await request(app)
            .get('/topicos/646e371ee991dfc971wf602b')
            .expect(500);
        /* console.log(dados._body) */
        expect(dados._body.message).toEqual('ID inválido');
    });
});

describe('/POST em topicos', () => {
    it.skip("Deve casdastrar um Topico", async () => {
        const dataTopico = Date.now();
        const dados = await request(app)
            .post('/topicos')
            .set('Accept', 'aplication/json')
            .send({
                _id: "64657dde77e2a231e0b481ca",
                titulo: "Mollitia sunt vitae h.",
                descricao: "Amet edawarum dolores magnam ipsum ex placeat sit itaque mollitia. Repellat quae magnam perferendis vero veritatis est. Velit ad non dolorem accusamus numquam minus rerum saepe. Voluptas id ut et ut omnis eum.",
                usuario: "64657dde77fca231e0b481be",
                ativo: "true",
                reportar: [
                    {
                        _id: "64680d0d3f403a963dab7d7c",
                        usuario: "64657dde77fca231e0b481be"
                    }
                ],
                discussao: [
                    {
                        usuario: "64657dde77fca231e0b481c3",
                        _id: "64680d0d3f403a963dab7d7d",
                        tema: "Consectetur dolorem ut rerum sed eos.",
                        criado_em: dataTopico,
                        like: [
                            {
                                _id: "64680d0d3f403a963dab7d7e",
                                usuario: [
                                    {}
                                ]
                            }
                        ],
                        reportar: [
                            {
                                _id: "64680d0d3f403a963dab7d7f",
                                usuario: "64657dde77fca231e0b481c3"
                            }
                        ],
                        comentario: [
                            {
                                texto: "Ipsum quisquam qui consequatur corporis et. Eos saepe deserunt qui officiis dolorem labore quia placeat. Sit illo deserunt.",
                                criado_em: dataTopico,
                                usuario: "64657dde77fca231e0b481c6",
                                like: [
                                    {
                                        usuario: "64657dde77fca231e0b481c6"
                                    }
                                ],
                                reportar: [
                                    {
                                        usuario: "64657dde77fca231e0b481c6"
                                    }
                                ]
                            }

                        ],
                        criando_em: dataTopico,
                        commentario: []
                    }
                ]
            })
            .expect(201);
        expect(dados._body.message).toEqual('Topico cadastrado com sucesso');
        /* const idTopico = dados._body._id;
        console.log(idTopico); */
    });
});

/* describe('/PACTH/ID em pessoas', () => {
    it("Deve atualizar pessoa cadastrada", async () => {
        const idPessoaPatch = "640be14204707b9590854572";
        let telefoneFalso = faker.phone.phoneNumber();
        const dados = await request(app)
            .patch(`/pessoas/${idPessoaPatch}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ telefone: telefoneFalso })
            .expect(200);
        //console.log(dados);
        expect(dados._body.message).toEqual('Cadastro atualizado com sucesso');
    }); 
    describe ('/DELETE/ID em pessoas, () => {
    it("Deve realizar um delete no id", async () => {
        const idPessoaPatch = "640be14204707b9590854572";
        const dados = await request(app)
        .delete(`/pessoas/${idPessoaPatch}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
    */
/*
describe ('/DELETE/ID em pessoas, () => {
it("Deve realizar um delete no id", async () => {
    const idPessoaPatch = "640be14204707b9590854572";
    const dados = await request(app)
    .delete(`/pessoas/${idPessoaPatch}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
});
*/




/* }); */
