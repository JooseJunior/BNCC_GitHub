import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

// Schema -> construtor para instanciar objetos no banco

const linhaTempoSchema = new mongoose.Schema({
    topico: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'topicos' }
        }
    ],
    descricao: { type: String, required:[true, 'Descrição obrigatória'] },
    criando_em: { type: Date, default: Date.now }, 
    atualizado_em: { type: Date}
},
    { versionKey: 'true' }
);

linhaTempoSchema.plugin(mongoosePaginate);

const linhatempos = mongoose.model('linhatempos', linhaTempoSchema);

export default linhatempos;

