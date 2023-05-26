//TODOS
import express from "express" //Unica importação que não referencia um arquivo

import usuarios from "../routes/UsuarioRoutes.js"
import login from "../routes/LoginRoutes.js"
import LinhaTempo from "..//routes/LinhaTempoRoutes.js"

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        usuarios,
        login,
        LinhaTempo
    )
    
}

export default routes;
