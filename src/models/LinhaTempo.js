//Novo
const moongose = req('moongose');

const LinhaTempoSchema = new moongose.Schema({
    nomeArquivo: {type: String, required: true},

    descricaoArquivo: {type: String, required: true},

    dataArquivo: {type: Date, required: true}

})

const LinhaTempo = moongose.model('LinhaTempo', LinhaTempoSchema);

export default LinhaTempo;

//Esse código define o modelo (model) do Mongoose para a coleção "linhatempo" em um banco de dados MongoDB.
//
//O modelo é definido através de um esquema (Schema) do Mongoose, que especifica os campos que cada documento da coleção deve ter. Nesse caso, //o esquema define os seguintes campos:
//
//    titulo: uma string obrigatória que representa o título da linha do tempo.
//    descricao: uma string obrigatória que representa a descrição da linha do tempo.
//    dataPublicacao: uma data obrigatória que representa a data de publicação da linha do tempo.
//    arquivo: uma string obrigatória que representa o arquivo associado à linha do tempo.
//
//O modelo é então criado a partir do esquema usando a função mongoose.model, que retorna uma classe que pode ser usada para realizar //operações no banco de dados, como criar, atualizar, buscar e excluir documentos da coleção.
//
//O modelo é exportado para que possa ser usado em outros arquivos, como no controller e nas rotas da API.