//JOSE
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

// Schema -> construtor para instanciar objetos no banco
const grupoSchema = new mongoose.Schema({
    nome: { type: String, required: [true, 'Nome obrigatório'], trim: true, index: true, unique: true },
    descricao: { type: String, required: [true, 'Descrição obrigatória']},
    ativo: { type: Boolean, default: true },
    rotas: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rotas' },    //ID da rota
        rota: { type: String, trim: true, required:[true, 'Rota obrigatória'] }, //Nome da rota
        verbo_get: { type: Boolean },
        verbo_put: { type: Boolean },
        verbo_patch: { type: Boolean },
        verbo_delete: { type: Boolean },
        verbo_post: { type: Boolean }
    }]
},
    { versionKey: 'true' }
);

grupoSchema.plugin(mongoosePaginate);

const grupos = mongoose.model('grupo', grupoSchema);

export default grupos;

