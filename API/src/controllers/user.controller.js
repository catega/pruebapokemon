const User = require('../models/user.model')

const getUsers = async (req, rep) => {
    try {
        const users = await User.find()
        rep.send(users)
    } catch (err) {
        rep.code(500).send({message: `Error al `})
    }
}

const loginUser = async (req, rep) => {
    const {username, password} = req.body

    let user = await User.findOne({username})
    if (!user) return rep.code(500).send({message: 'No existe un usuario con ese nombre'})

    const passMatch = await req.server.bcrypt.compare(password, user.password)

    if (!passMatch) return rep.code(500).send({message: 'Las credenciales no son correctas'})

    user = await User.findOne({username}, {password: 0})

    const token = await req.server.jwt.sign(user)

    user.token = token

    rep.send(user)
}

const registerUser = async (req, rep) => {
    if (!req.body) return rep.code(500).send({message: 'Faltan parámetros para el registro'})

    const {username, password} = req.body

    const user = await User.findOne({username})
    if (user) return rep.code(500).send({message: 'Ya existe un usuario con ese nombre'})

    const passwordEncrypt = await req.server.bcrypt.hash(password)

    const newUser = new User({
        username,
        password: passwordEncrypt
    })

    await newUser.save()

    rep.send({message: 'Usuario creado correctamente'})
}

const deleteUser = async (req, rep) => {
    await User.findByIdAndDelete(req.params.id)
    rep.send(await User.find())
}

const catchPokemon = async (req, rep) => {
    const newUser = await User.findByIdAndUpdate(req.params.id, {pokemons: req.body}, {new: true})
    rep.send(newUser.pokemons)
}

module.exports = {
    getUsers,
    loginUser,
    registerUser,
    deleteUser,
    catchPokemon
}