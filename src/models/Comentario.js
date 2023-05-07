const moongose = require('moongose');

const ComentarioSchema = new moongose.Schema({


    text:{
        type: String,
        required: true
    },

    user:{
        type: String,
        required: true
    },

    post: {
        type:moongose.Schema.Types.ObjectId,
        ref: 'Post',
        required:true
    },

    liked: {
        type: Boolean,
        default: false,
    },

    createdAT: {
        type: Date, 
        default: Date.now
    }
});

    const comentario = moongose.model('Comentario', ComentarioSchema);

    export default comentario;

    //O modelo tem um esquema que define os campos e seus tipos de dados, bem como as opções de validação para cada campo.

    //O esquema "ComentarioSchema" tem os seguintes campos:

    //text: uma string obrigatória que representa o texto do comentário.

    //user: uma string obrigatória que representa o nome do usuário que fez o comentário.

    //post: uma referência obrigatória a um objeto Post, que representa o post associado ao comentário. Isso é feito utilizando o tipo ObjectId e definindo a propriedade "ref" como "Post".

    //liked: um booleano que representa se o comentário foi curtido ou não. O valor padrão é false.

    //createdAt: um timestamp que representa a data e hora em que o comentário foi criado. O valor padrão é a data e hora atual.