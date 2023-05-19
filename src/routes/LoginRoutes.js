import express from "express";
import LoginController from "../controllers/LoginController.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /login:
 *    post:
 *      tags:
 *          - Login
 *      summary: Faz o login do usuário
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/login'
 *      responses:
 *        '200':
 *          description: Login realizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/login'
*/


router
  .post("/login", LoginController.logar)

export default router;
