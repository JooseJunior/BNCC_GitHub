//Guilherme

import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import request from "supertest";
import express from "express";
import GrupoRoutes from "../../routes/GrupoRoutes.js";
import GrupoController from "../../controllers/GrupoController.js";

//Cria uma instancia do aplicativo Express
const app = express();
//Adiciona as rotas do GrupoRoutes ao aplicativo
app.use("/", GrupoRoutes);

describe("Testes das rotas do GrupoRoutes", () => {
    it("Deve cadastrar um grupo com sucesso", async () => {
        const grupo = {
            nome: "Grupo de teste",
            descricao: "Descrição do grupo de teste"
        };

        //Mock da função cadastrarGrupo no GrupoController
        GrupoController.cadastrarGrupo = jest.fn().mockImplementation((req, res) => {
            res.status(201).json(grupo);
        });

        const response = await request(app)
            .post("/grupos")
            .send(grupo);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(grupo);
        expect(GrupoController.cadastrarGrupo).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything()
        );
    });

    it("Deve listar todos os grupos com sucesso", async () => {
        const grupos = [
            { id: 1, nome: "Grupo 1", descricao: "Descrição do Grupo 1" },
            { id: 2, nome: "Grupo 2", descricao: "Descrição do Grupo 2" },
        ];
    
        // Mock da função listarGrupo no GrupoController
        GrupoController.listarGrupo = jest.fn().mockImplementation((req, res) => {
            res.status(200).json(grupos);
        });
    
        const response = await request(app)
            .get("/grupos");
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(grupos);
        expect(GrupoController.listarGrupo).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything()
        );
    });
    
    it("Deve listar um grupo por ID com sucesso", async () => {
        const grupo = { id: 1, nome: "Grupo 1", descricao: "Descrição do Grupo 1" };
    
        // Mock da função listarGrupoPorId no GrupoController
        GrupoController.listarGrupoPorId = jest.fn().mockImplementation((req, res) => {
            res.status(200).json(grupo);
        });
    
        const response = await request(app)
            .get("/grupos/1");
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(grupo);
        expect(GrupoController.listarGrupoPorId).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything()
        );
    });
});