const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    pokemons: {
        type: Array,
        default: []
    },
    token: {
        type: String,
        default: ''
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema)