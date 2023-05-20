import mongoose from "mongoose";
// import mongoosePaginate from 'mongoose-paginate';

import faker from 'faker-br';
import bcrypt from 'bcryptjs';
import db from '../config/dbConnect.js';
import Rota from '../models/Rotas.js';
import Grupo from '../models/GrupoUsuario.js';
import Usuario from '../models/Usuario.js';

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
    'grupos', 'grupos:id',
    'usuarios', 'usuarios:id'
]
function getRotaName(i) {
    return rotas_array[i].toString();
}

function seedRotas(qtdrotas) {
    for (let i = 0; i < qtdrotas; i++) {
        const rota = {
            rota: getRotaName(i),
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
const grupos_array = ['Administrador', 'Normal']

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
// function removerChaves(obj) {
//     for (let i = 0; i < obj.length; i++) {
//         delete obj[i].nome
//         delete obj[i].descricao;
//         delete obj[i].ativo;
//         delete obj[i].rotas;
//         delete obj[i].unidades;
//     }
//     return obj;
// }

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
            // link_foto: faker.image.avatar(),
            rotas: rotas,
            // grupos: removerChaves(grupos)

        }
        usuarios.push(seedUsuarios);
        // console.log('Usuários ' + i + ' inseridos!');
    }
    return usuarios;
}

seedUsuario(20);
await Usuario.collection.insertMany(usuarios);
console.log(usuarios.length + ' Usuarios inseridos!');

// função para encrytar senha usando bcryptjs

function senhaHash() {
    return bcrypt.hashSync('123123', 8);
}

//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
// db.close((err) => { err ? console.log(err) : console.log('Conexão com o banco encerrada!') });
