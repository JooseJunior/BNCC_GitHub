// importando express(req, res)
import express from "express";
import routes from "./routes/index.js";
import db from "../src/config/dbConnect.js"

// estabelecendo e testando a conexão
function conection (){
    db.on("error", (error) =>{
        console.log("Conexão não estabelecida: " + error)
    })
    db.once("open", () =>{
        console.log("Conexão estabelecida com sucesso!")
    })
}

conection()

//instanciando express
const app = express();

// habilitando o uso de json pelo express
app.use(express.json());

// Passando para o arquivo de rotas o app, que envia junto uma instância do express
routes(app);

// exportando para o server.js fazer uso
export default app
