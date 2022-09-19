const pokemonControllers = require('../controllers/pokemon.controller')
const authJwt = require('../middleware/auth.jwt')

const pokemonRoutes = [
    {
        url: '/p',
        method: 'POST',
        handler: pokemonControllers.getPokemons
    },
    {
        url: '/p/:id',
        method: 'GET',
        handler: pokemonControllers.getPokemon
    },
    {
        url: '/p/load',
        method: 'GET',
        onRequest: authJwt,
        handler: pokemonControllers.loadPokemons
    },
    {
        url: '/p/:id',
        method: 'DELETE',
        onRequest: authJwt,
        handler: (req, rep) => {return}
    },
    {
        url: '/p/:id',
        method: 'PUT',
        onRequest: authJwt,
        handler: (req, rep) => {return}
    }
]

module.exports = pokemonRoutes