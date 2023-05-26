//JOSE
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

// Schema -> construtor para instanciar objetos no banco
const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: [true, 'Nome obrigatório'], min: 6, max: 255, trim: true },
    email: {
        type: String, required: [true, 'E-mail obrigatório'], unique: true,
        //Regex => Expressão Regular
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    senha: { type: String, minlength: 8, trim: true, required: [true, 'Senha obrigatória'], select: false },
    ativo: { type: Boolean, default: true },
    grupos: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'grupos' }
        }
    ],
    rotas: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rotas' },    //ID da rota
        rota: { type: String, trim: true, required: [true, 'Rota obrigatória'] },             //Nome da rota
        verbo_get: { type: Boolean },
        verbo_put: { type: Boolean },
        verbo_patch: { type: Boolean },
        verbo_delete: { type: Boolean },
        verbo_post: { type: Boolean }
    }]
},
    { versionKey: 'true' }
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuario', usuarioSchema);

export default usuarios;

