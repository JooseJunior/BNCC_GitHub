import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const usuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, maxlength: 200, trim: true },
        email: {type: String, maxlength: 60, unique: true},
        usuario: {type: String, maxlength: 50, unique: true},
        senha: {type: String, minlenght: 8}
        // linkLattes: {type: String, trim: true}
    },
    { versionKey: false }
);

usuarioSchema.plugin(mongoosePaginate);

const usuario = mongoose.model('Usuario', usuarioSchema);

export default usuario;