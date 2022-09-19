const Pokemon = require('../models/pokemon.model')

const loadPokemons = async (req, rep) => {
    const pkmn = await Pokemon.findOne()

    if (pkmn) return

    let pokemons = await req.server.axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    pokemons = pokemons.data.results

    for (let pokemon of pokemons) {
        const pkmn = await req.server.axios.get(pokemon.url)
        const elementos = pkmn.data.types.map(type => {
            return type.type.name
        })
        const vida = pkmn.data.stats[0].base_stat
        const ataque = pkmn.data.stats[1].base_stat
        const defensa = pkmn.data.stats[2].base_stat
        const ataque_esp = pkmn.data.stats[3].base_stat
        const velocidad = pkmn.data.stats[5].base_stat
        const img = pkmn.data.sprites.other['official-artwork'].front_default
        const nombre = pokemon.name

        const newPokemon = new Pokemon({
            nombre,
            elementos,
            stats: {
                vida,
                ataque,
                defensa,
                ataque_esp,
                velocidad
            },
            img
        })

        await newPokemon.save()
    }
}

const getPokemons = async (req, rep) => {
    try {
        const pokemons = await Pokemon.find()
        rep.send(pokemons)
    } catch (err) {
        rep.code(500).send({message: `Error al encontrar los pokémon: ${err}`})
    }
}

const getPokemon = async (req, rep) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id)
        rep.send(pokemon)
    } catch (err) {
        rep.code(404).send({message: 'Pokémon no encontrado'})
    }
}

module.exports = {
    loadPokemons,
    getPokemons,
    getPokemon
}