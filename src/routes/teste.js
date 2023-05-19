import express from "express";
import Teste from "../controllers/Teste.js";

const router  = express.Router(); 

router
  .get("/teste", Teste)


export default router;
