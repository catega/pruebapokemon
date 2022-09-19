const User = require('../models/user.model')
require('dotenv').config()

const authJwt = async (req, rep, done) => {
    const token = req.headers['authorization']

    if (!token) return rep.code(500).send({message: 'Se necesita un token para acceder a esta ruta'})

    const tokenDecoded = req.server.jwt.verify(token, process.env.TOKEN_SECRET)

    const user = await User.findById(tokenDecoded._doc._id)

    if (!user) return rep.code(500).send({message: 'El token no es válido'})
}

module.exports = authJwt