import { createContext, useState } from "react"
import axios from 'axios'
import {message} from 'antd'

export const MainContext = createContext()

export const MainContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [errorLogin, setErrorLogin] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const [errorRegister, setErrorRegister] = useState('')
    const [isRegistered, setIsRegistered] = useState(false)

    const login = async (userLogin) => {
        try {
            const user = await axios.post(`${import.meta.env.VITE_API_URL}/u/login`, userLogin)
            setUser(user.data)
            setIsLogged(true)
            message.success('Te has loggeado correctamente')
        } catch (err) {
            console.log(err)
            if (err.response.status === 500) setErrorLogin(err.response.data.message)
        }
    }

    const registerUser = async (userRegister) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/u/register`, userRegister)
            setIsRegistered(true)
            message.success('Te has registrado correctamente')
        } catch (err) {
            if (err.response.status === 500) setErrorRegister(err.response.data.message)
        }
    }

    const updateUser = (newUser) => {
        setUser(newUser)
    }

    return(
        <MainContext.Provider value={{user, login, errorLogin, isLogged, registerUser, errorRegister, isRegistered, updateUser}}>
            {props.children}
        </MainContext.Provider>
    )
}