require('dotenv').config()

const userRoutes = require('./routes/user.routes')
const pokemonRoutes = require('./routes/pokemon.routes')

const fastify = require('fastify')({
    logger: true
})

fastify.register(require('@fastify/cors'), {
    origin: process.env.URL_ACEPTADA
})
fastify.register(require('@fastify/jwt'), {
    secret: process.env.TOKEN_SECRET
})
fastify.register(require('fastify-bcrypt'), {
    saltWorkFactor: 10
})
fastify.register(require('fastify-axios'))

require('./db/db')

userRoutes.forEach(route => {
    fastify.route(route)
})
pokemonRoutes.forEach(route => {
    fastify.route(route)
})

const start = async () => {
    try {
        await fastify.listen({port: process.env.PORT || 3000})
        console.log('[+] Server conectado')
    } catch (err) {
        console.log(`[!] Error de conexión: ${err}`)
    }
}

start()