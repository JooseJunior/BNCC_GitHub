const moongose = require('moongose');

const ComentarioSchema = new mongoose.Schema({

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
})