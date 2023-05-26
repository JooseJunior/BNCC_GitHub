//GUSTAVO
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

// Schema -> construtor para instanciar objetos no banco
const topicoSchema = new mongoose.Schema({
    titulo: { type: String, required:[true, 'Título obrigatório'] },
    descricao: { type: String, required: [true, 'Descrição obrigatória'] },
    usuario: { _id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' } },
    criando_em: { type: Date, default: Date.now },
    ativo: { type: Boolean, default: true },
    reportar: [
        { usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' } }
    ],
    discussao: [
        {
            tema: { type: String, required: [true, 'Tema obrigatório'] },
            criando_em: { type: Date, default: Date.now },
            usuario: { _id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' } },
            like: [
                {
                    usuario: [
                        {
                            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' }
                        }
                    ]
                }
            ],
            reportar: [
                { usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' } }
            ],
            commentario: [
                {
                    texto: { type: String, required: [true, 'Texto obrigatório'] },
                    criando_em: { type: Date, default: Date.now },
                    usuario: { _id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' } },
                    like: [
                        {
                            usuario: [
                                {
                                    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' }
                                }
                            ]
                        }
                    ],
                    reportar: [
                        { usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' } }
                    ]
                }
            ],

        }
    ]
},
    { versionKey: 'true' }
);

topicoSchema.plugin(mongoosePaginate);

const topicos = mongoose.model('topicos', topicoSchema);

export default topicos;