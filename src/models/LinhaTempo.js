//VINICIUS
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

// Schema -> construtor para instanciar objetos no banco

const linhaTempoSchema = new mongoose.Schema({
    titulo:  { type: String, required:[true, 'Título obrigatório'] },
    conteudo: {type: String, required:[true, 'Título obrigatório']},
    criando_em: { type: Date, default: Date.now }
},
    { versionKey: 'true' }
);

linhaTempoSchema.plugin(mongoosePaginate);

const linhatempos = mongoose.model('linhatempos', linhaTempoSchema);

export default linhatempos;
