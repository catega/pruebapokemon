import { useState, useContext, useEffect } from 'react'
import { MainContext } from '../contexts/MainContext'
import { useNavigate } from 'react-router-dom'
import PokemonList from '../components/PokemonList'
import axios from 'axios'
import '../App.css'
import 'antd/dist/antd.css'
import getHeader from "../config/axios.config"
import {Divider, message, Select} from 'antd'

function Pokemon() {
  const {user, updateUser} = useContext(MainContext)
  const navigate = useNavigate()
  const [userPokemons, setUserPokemons] = useState(user ? user.pokemons : null)
  const [pokemons, setPokemons] = useState(null)
  const [ready, setReady] = useState(false)
  const [isTime, setIsTime] = useState(true)
  const {Option} = Select

  const getPokemons = async () => {
    if (!userPokemons && user) setUserPokemons(user.pokemons)
    const pkmn = await axios.post(`${import.meta.env.VITE_API_URL}/p`, {})

    setPokemons(pkmn.data)
    setReady(true)
  }

  const filterPokemons = () => {
    if (userPokemons.length !== 0 && pokemons) {
      const pkmnFilter = pokemons.filter(e => {
        return !userPokemons.find(f => {
          return e._id === f._id
        })
      })

      setPokemons(pkmnFilter)
    }
  }

  const catchPokemon = async (pokemons) => {
    if (user.pokemons.length === 10) {
      message.error('No puedes capturar más de 10 pokémons')
      return
    }

    try {
        let newPokemons = ''
        
        const random = Math.floor(Math.random() * 11)

        if (random >= user.pokemons.length) {
          newPokemons = await axios.put(`${import.meta.env.VITE_API_URL}/u/catch/${user._id}`, pokemons, getHeader(user.token))
          
          user.pokemons = newPokemons.data
          updateUser(user)
          setUserPokemons(user.pokemons)
          setIsTime(false)

          message.success('Pokémon atrapado')
        } else {
          message.warning('Has fallado. Inténtalo de nuevo')
        }
    } catch (err) {
        console.log(err)
    }
  }

  const sortPokemons = (stat) => {
    setUserPokemons([...userPokemons].sort((a, b) => a.stats[stat] - b.stats[stat]))
  }

  useEffect(() => {
    if (!user) navigate('/login')

    if (!pokemons) getPokemons()

    if (userPokemons) filterPokemons()

    if (!isTime) {
      const timer = setTimeout(() => {
        setIsTime(true)
        message.info('Ya puedes capturar de nuevo')
      }, 60000)
      return () => clearTimeout(timer)
    }
  }, [userPokemons, ready])

  return (

    <div className="Pokemons">
      <Divider>
        <h1>{'Tus pokémon'}</h1>
        <Select 
        className='select-stat'
        onChange={value => sortPokemons(value)} 
        placeholder={'Selecciona un stat'} 
        defaultValue={'vida'}
        size={'large'}>
          <Option value={'vida'}>Vida</Option>
          <Option value={'ataque'}>Ataque</Option>
          <Option value={'ataque_esp'}>Ataque Esp</Option>
          <Option value={'defensa'}>Defensa</Option>
          <Option value={'velocidad'}>Velocidad</Option>
        </Select>
      </Divider>
      {!userPokemons ? 'Cargando...' : <PokemonList pokemons={userPokemons} isUser={true} />}
      
      <Divider>
        <h2>{'Pokémon para capturar'}</h2>
      </Divider>
      {!pokemons ? 'Cargando...' : <PokemonList pokemons={pokemons} catchPokemon={catchPokemon} isUser={false} isTime={isTime}/>}
    </div>
  )
}

export default Pokemon
