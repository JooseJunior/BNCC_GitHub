import express from "express" //Unica importação que não referencia um arquivo
import teste from "./teste.js" //Importar arquivos dentro da pasta Rotas
import usuarios from "../routes/UsuarioRoutes.js"
import login from "../routes/LoginRoutes.js"

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        usuarios,
        login
    )

}

export default routes;
