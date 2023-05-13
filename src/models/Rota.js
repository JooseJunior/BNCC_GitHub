import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const rotaSchema = new mongoose.Schema(
    {
        rota: { type: String, required: true },
        dominio: { type: String, required: true },
        ativo: { type: Boolean, default: true },
        verbo_get: { type: Boolean },
        verbo_put: { type: Boolean },
        verbo_patch: { type: Boolean },
        verbo_delete: { type: Boolean },
        verbo_post: { type: Boolean }
    },
    {
        versionKey: false
    },
    // criar um indice composto para rota e dominio
    {
        indexes: [{ rota: 1, dominio: 1 }]
    }
);

// rotaSchema.plugin(mongoosePaginate);

const rotas = mongoose.model('rotas', rotaSchema);

export default rotas;
