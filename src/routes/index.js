import express from "express" //Unica importação que não referencia um arquivo
import grupos from "./gruposRoutes.js" //Importar arquivos dentro da pasta Rotas

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
    )

}

export default routes
