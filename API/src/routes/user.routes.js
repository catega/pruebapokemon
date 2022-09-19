const userController = require('../controllers/user.controller')
const authJwt = require('../middleware/auth.jwt')

const userRoutes = [
    {
        url: '/u',
        method: 'GET',
        onRequest: authJwt,
        handler: userController.getUsers
    },
    {
        url: '/u/login',
        method: 'POST',
        handler: userController.loginUser
    },
    {
        url: '/u/register',
        method: 'POST',
        handler: userController.registerUser
    },
    {
        url: '/u/:id',
        method: 'DELETE',
        onRequest: authJwt,
        handler: userController.deleteUser
    },
    {
        url: '/u/catch/:id',
        method: 'PUT',
        onRequest: authJwt,
        handler: userController.catchPokemon
    }
]

module.exports = userRoutes