//JOSE
import express from "express";
import GrupoController from "../controllers/GrupoController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .post("/grupos", GrupoController.cadastrarGrupo)
    .get("/grupos", GrupoController.listarGrupo)
    .get("/grupos/:id", GrupoController.listarGrupoPorId)
    
/* const grupoSchema = new mongoose.Schema({
}, { versionKey: false });
      
const Grupo = mongoose.model("Grupo", grupoSchema);
       */
export default router;