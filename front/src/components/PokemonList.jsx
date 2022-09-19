import PokemonCard from "./PokemonCard"
import { useContext } from "react"
import { MainContext } from "../contexts/MainContext"
import {Row, Col, message} from 'antd'

const PokemonList = ({pokemons, catchPokemon, isUser, isTime}) => {
    const {user} = useContext(MainContext) 

    const sendCatch = (pokemon) => {
        if (isUser) return

        if (!isTime) {
            message.error('No puedes capturar todavía')
            return
        }

        catchPokemon([...user.pokemons, pokemon])
    }

    return (
        <Row gutter={[8, 8]}>
            {pokemons.length === 0 
            ? 'No hay pokémons' 
            : pokemons.map((pokemon, key) => {
                return (
                    <Col xs={12} sm={6} md={4} key={pokemon._id} className={'pokemon-card'} onClick={() => sendCatch(pokemon)}>
                        <PokemonCard pokemon={pokemon}/>
                    </Col>
                )
            })
            }
        </Row>
    )
}

export default PokemonList