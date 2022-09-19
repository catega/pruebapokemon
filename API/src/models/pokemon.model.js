const {Schema, model} = require('mongoose')

const pokemonSchema = new Schema({
    nombre: String,
    elementos: Array,
    stats: {
        vida: Number,
        ataque: Number,
        defensa: Number,
        ataque_esp: Number,
        velocidad: Number
    },
    img: String
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Pokemon', pokemonSchema)