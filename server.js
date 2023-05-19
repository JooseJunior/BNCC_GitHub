import app from './src/app.js' // importando apps
import * as dotenv from 'dotenv'; // necessário para leitura do arquivo de variáveis
import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express'; // para documentação com o swagger
import swaggerJsDoc from 'swagger-jsdoc';  // para documentação com o swagger
import swaggerOptions from './src/docs/head.js'; // importando configurações do swagger


dotenv.config()

// definição de porta condicional do proxy ou na 3000

const port = process.env.PORT || 3000;

const swaggerDocs = swaggerJsDoc(swaggerOptions); // para documentação com o swagger
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs)); // documentação com o swagger


app.use(cors([
  {origin: '*' },
  {methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}
])); //  Mude apenas isso: origin: ['https://www.section.io', 'https://www.google.com/']
// app.use(express.json())

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false })); //


// retorno no terminal com o link
app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
  // console.log(process.env); // Visualizar as variáveis de ambiente em uso
})

// executar node server.js
// executar usnado o nodemon npm run dev
