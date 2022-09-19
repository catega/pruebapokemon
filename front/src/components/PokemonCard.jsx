import {Card, Tag} from 'antd'

const PokemonCard = ({pokemon}) => {
    const getElementoTag = (elemento) => {
        let tagColor = ''

        if (elemento === 'fire') tagColor = '#F08030'
        if (elemento === 'water') tagColor = '#6890F0'
        if (elemento === 'grass') tagColor = '#78C850'
        if (elemento === 'electric') tagColor = '#F8D030'
        if (elemento === 'ice') tagColor = '#98D8D8'
        if (elemento === 'fighting') tagColor = '#C03028'
        if (elemento === 'poison') tagColor = '#A040A0'
        if (elemento === 'ground') tagColor = '#E0C068'
        if (elemento === 'flying') tagColor = '#BCDFD7'
        if (elemento === 'psychic') tagColor = '#F85888'
        if (elemento === 'bug') tagColor = '#A8B820'
        if (elemento === 'rock') tagColor = '#B8A038'
        if (elemento === 'ghost') tagColor = '#705898'
        if (elemento === 'dragon') tagColor = '#7038F8'
        if (elemento === 'dark') tagColor = '#414141'
        if (elemento === 'steel') tagColor = '#C7C7C7'
        if (elemento === 'fairy') tagColor = '#EE99AC'

        return <Tag key={`${pokemon._id}-${elemento}`} color={tagColor}>{elemento}</Tag>
    }

    return (
        <Card 
        hoverable 
        size='small'
        cover={<img src={pokemon.img} alt={pokemon.nombre}/>}
        title={pokemon.nombre}
        className={'pokemon-card'}
        >
            <p>{`Vida: ${pokemon.stats.vida}`}</p>
            <p>{`Ataque: ${pokemon.stats.ataque}`}</p>
            <p>{`Ataque Esp: ${pokemon.stats.ataque_esp}`}</p>
            <p>{`Defensa: ${pokemon.stats.defensa}`}</p>
            <p>{`Velocidad: ${pokemon.stats.velocidad}`}</p>
            <p>{'Elemento/s:'}</p>
            {pokemon.elementos.map(elemento => {
                return getElementoTag(elemento)
            })}
        </Card>
    )
}

export default PokemonCard