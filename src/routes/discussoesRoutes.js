//
import express from "express";
import DiscussoesController from "../controller/discussoesController.js";
import AuthMidleware from "../middlewares/AuthMidleware.js";

const router = express.Router();

router
  .get("/discussoes", DiscussoesController.listarDiscussoes)
  .get("/discussoes/:id", DiscussoesController.listarDiscussoesPorId)
  .post("/discussoes",AuthMidleware, DiscussoesController.cadastrarDiscussoes)
  .put("/discussoes/:id",AuthMidleware, DiscussoesController.atualizarDiscussoes)
  .delete("/discussoes/:id",AuthMidleware, DiscussoesController.excluirDiscussoes)
  .patch("/discussoes/:id",AuthMidleware, DiscussoesController.atualizarDiscussoes)

export default router;