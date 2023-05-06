// necessário para leitura do arquivo de variáveis
import * as dotenv from 'dotenv';

dotenv.config()

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "daw r ",
      description: "API para controlar os atendimentos prestados pelo órgão",
      version: "1.0.0",
      contact: {
        name: "API-CRAS",
        email: "gilberto.silva@ifro.edu.br",
        url: "fslab.dev"
      },
      license: {
        name: "Lincença: GPLv3",
        url: "http://www.gnu.org/licenses/gpl-3.0.html"
      }
    },
    servers: [
      {
        url: process.env.URL1_API,
        description: "API em desenvovlvimento no FSLAB"
      },
      {
        url: process.env.URL2_API,
        description: "API em desenvovlvimento no FSLAB"
      }
    ],
    tags: [
      {
        name: "Login",
        description: "Login do usuário"
      },
      {
        name: "Pessoas",
        description: "Pessoas do sistema"
      },
      {
        name: "Atendimentos",
        description: "Atendimentos do sistema"
      },
      {
        name: "Usuários",
        description: "Usuários do sistema"
      },
      {
        name: "Grupos",
      description: "Grupos de acesso as rotas"
      },
      {
        name: "Rotas",
        description: "Rotas de acesso aos recursos"
      },
      {
        name: "Unidades",
        description: "Unidades do sistema (Órgão, Cidade, Prefeitura, Câmara, etc)"
      },
      {
        name: "Recuperar Senha",
        description: "Recuperação de senha do usuário"
      },
      {
        name: "Alterar Senha",
        description: "Alteração de senha do usuário"
      },
      {
        name: "Sessao",
        description: "Sessão do usuário"
      }
    ],
    paths: {},
    components: {
      securitySchemes:{
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

export default swaggerOptions;
