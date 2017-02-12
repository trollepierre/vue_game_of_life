// Design d'après JBU

// On poste une création de grille avec un identifiant

// On demande des get pour chaque évolution

function getPokedexIdFromItsUrl (pokemon) {
  if (!pokemon.url) {
    return 'N/A'
  }
  const regexp = /http:\/\/pokeapi\.co\/api\/v2\/pokemon\/(\d+)\//
  const matches = regexp.exec(pokemon.url)
  return matches ? matches[1] : 'N/A'
}

function convertNumberIntoStringWithLeadingZeros (number, stringLength) {
  const str = number.toString()
  return str.length < stringLength ? convertNumberIntoStringWithLeadingZeros(`0${str}`, stringLength) : str
}

export default {
  name: 'pokemon-list',
  data () {
    return {
      pokemons: []
    }
  },
  created () {
    return this.$http.get('http://pokeapi.co/api/v2/pokemon/').then(response => {
      const pokemonImageBankUrl = 'http://assets.pokemon.com/assets/cms2/img/pokedex/detail'
      this.pokemons = response.body.results.map(function (pokemon) {
        const pokemonId = convertNumberIntoStringWithLeadingZeros(getPokedexIdFromItsUrl(pokemon), 3)
        pokemon.id = pokemonId
        pokemon.imageUrl = `${pokemonImageBankUrl}/${pokemonId}.png`
        return pokemon
      })
    })
  }
}