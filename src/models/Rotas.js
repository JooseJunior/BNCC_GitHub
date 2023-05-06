import mongoose from "mongoose";
// import mongoosePaginate from 'mongoose-paginate';

const rotaSchema = new mongoose.Schema(
    {
        rota: { type: String, required: true, unique: true },
        ativo: { type: Boolean, default: true },
        verbo_get: { type: Boolean },
        verbo_put: { type: Boolean },
        verbo_patch: { type: Boolean },
        verbo_delete: { type: Boolean },
        verbo_post: { type: Boolean }
    },
    {
        versionKey: false
    }
);

// rotaSchema.plugin(mongoosePaginate);

const rotas = mongoose.model('rotas', rotaSchema);

export default rotas;
