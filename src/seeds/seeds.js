import mongoose from "mongoose";
import faker from 'faker-br';
import bcrypt from 'bcryptjs';
import db from '../config/dbConnect.js';
import Rota from '../models/Rota.js';
import Grupo from '../models/Grupo.js';
import Usuario from '../models/Usuario.js';
import LinhaTempo from '../models/LinhaTempo.js';
import Topico from '../models/Topico.js';


// Estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida!')
});

// Função para gerar um numero aleatório entre 1 e 1000000,  
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//==================================================================================
// Eliminando as rotas existentes
await Rota.deleteMany();

// Rotas que serão inseridas no banco de dados
const rotas = [];

// função para retornar o nome de uma rota pela posição do array
const rotas_array = [
    'grupos',
    'grupos:id',
    'usuarios',
    'usuarios:id',
    'rotas',
    'rotas:id',
    'linhatempo',
    'linhatempo:id',
    'topicos',
    'topicos:id'
]
function getRotaName(i) {
    return rotas_array[i].toString();
}

function seedRotas(qtdrotas) {
    for (let i = 0; i < qtdrotas; i++) {
        const rota = {
            rota: getRotaName(i),
            dominio: 'localhost',
            ativo: true,
            verbo_get: true,
            verbo_put: true,
            verbo_patch: true,
            verbo_delete: true,
            verbo_post: true,
        }
        rotas.push(rota);
    }
    return rotas;
}
seedRotas(rotas_array.length);
await Rota.collection.insertMany(rotas);
console.log(rotas.length + ' Rotas inseridas!');

//==================================================================================
//Eliminando os grupos existentes
await Grupo.deleteMany();
const grupos = [];

// Função para retornar o nome de alguns grupos fictícios
const grupos_array = ['Administrador', 'Todos']

function getGrupoName(i) {
    return grupos_array[i].toString();
}
function seedGrupos(qtdgrupos) {
    for (let i = 0; i < qtdgrupos; i++) {
        const seedGrupos = {
            nome: getGrupoName(i),
            descricao: faker.lorem.sentence(),
            ativo: true,
            rotas: rotas
        }
        grupos.push(seedGrupos);
        // console.log('Grupo ' + i + ' inserido!');
    }
    return grupos;
}
seedGrupos(grupos_array.length)
await Grupo.collection.insertMany(grupos);
console.log(grupos.length + ' Grupos inseridos!');

//==================================================================================
// Eliminando os grupos existentes
await Usuario.deleteMany();

// Usuarios que serão inseridos no banco de dados
const usuarios = [];

// Remover todas as chaves de um array de objetos excepto o id
function removerChaves(obj) {
    for (let i = 0; i < obj.length; i++) {
        delete obj[i].nome
        delete obj[i].descricao;
        delete obj[i].ativo;
        delete obj[i].rotas;
    }
    return obj;
}

function seedUsuario(qtdusuarios) {
    for (let i = 1; i <= qtdusuarios; i++) {
        let nome = faker.name.firstName();
        let sobrenome = faker.name.lastName();
        let email = nome + '.' + sobrenome + '@' + "gmail.com";

        const seedUsuarios = {
            nome: nome + ' ' + sobrenome,
            email: email.toLowerCase(),
            senha: senhaHash(),
            ativo: true,
            grupos: removerChaves(grupos),
            rotas: rotas
        }
        usuarios.push(seedUsuarios);
    }
    return usuarios;
}

seedUsuario(100);
await Usuario.collection.insertMany(usuarios);
console.log(usuarios.length + ' Usuarios inseridos!');

// função para encrytar senha usando bcryptjs

function senhaHash() {
    return bcrypt.hashSync('123', 8);
}

// função para retornar um usuario aleatorio
function getUsuario() {
    return usuarios[getRandomInt(usuarios.length)]._id;
}

// função para retornar 10 usuarios aleatorios
function getUsuariosDiscussao() {
    const usuariosLogado = [];
    for (let i = 0; i < 10; i++) {
        usuariosLogado.push(getUsuario());
    }
    return usuariosLogado;
}

// gerar 10 comentários aleatorios
function getComentario() {
    const comentarios = [];
    for (let i = 0; i < 10; i++) {
        const usuariosLogado = getUsuario();
        comentarios.push(
            {
                texto: faker.lorem.paragraph(),
                criado_em: faker.date.past(),
                usuario: usuariosLogado,
                like: [
                    {
                        usuario: usuariosLogado
                    }
                ],
                reportar: [
                    {
                        usuario: usuariosLogado
                    }
                ]
            }
        )
    }
    return comentarios;
}

// gerar 10 discussões aleatorias
function getDiscussao() {
    const discussao = [];
    for (let i = 0; i < 10; i++) {

        const usuariosLogado = getUsuario();

        discussao.push(
            {
                tema: faker.lorem.sentence(),
                criado_em: faker.date.past(),
                usuario: usuariosLogado,
                like: [
                    {
                        usuario: usuariosLogado
                    }
                ],
                reportar: [
                    {
                        usuario: usuariosLogado
                    }
                ],
                comentario: getComentario(),
            }
        )
    }
    return discussao;
}

// gerar topicos aleatorios
await Topico.deleteMany();

const topicos = [];

function seedTopicos(qtdtopicos) {
    for (let i = 1; i <= qtdtopicos; i++) {

        const usuariosLogado = getUsuario();

        const seedTopicos = {
            titulo: faker.lorem.sentence(),
            descricao: faker.lorem.paragraph(),
            ativo: true,
            reportar: [
                {
                    usuario: usuariosLogado
                }
            ],
            discussao: getDiscussao(),
        }
        topicos.push(seedTopicos);
    }
    return topicos;
}

seedTopicos(5000);
await Topico.collection.insertMany(topicos);
console.log(topicos.length + ' Topicos inseridos!');

// encerrar a conexão com o banco de dados com uma mensagem no console
db.close();
console.log('Conexão com o banco de dados encerrada!');
