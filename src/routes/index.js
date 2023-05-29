//TODOS
import express from "express" //Unica importação que não referencia um arquivo
import grupos from "../routes/GrupoRoutes.js"
import usuarios from "../routes/UsuarioRoutes.js"
import login from "../routes/LoginRoutes.js"
import linhaTempo from "../routes/LinhaTempoRoutes.js"
import topicos from "../routes/TopicoRoutes.js"
//import discussoes from "../routes/discussoesRoutes.js"
//import comentarios from "../routes/comentariosRoutes.js"

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        grupos,
        usuarios,
        login,
        linhaTempo,
        topicos,
        //discussoes
        //comentarios

    )
    
}

export default routes;
