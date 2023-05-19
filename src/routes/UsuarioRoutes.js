import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

const usuarioSchema = new mongoose.Schema({
}, { versionKey: false });
  
const Usuario = mongoose.model("Usuario", usuarioSchema);
  
router
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .get("/usuarios", UsuarioController.listarUsuario)
    .get("/usuarios/:id", UsuarioController.listarUsuarioPorId);
      
export default router;