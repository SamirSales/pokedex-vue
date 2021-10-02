export default class PokemonDetails {
    constructor(pokemonSpeciesOutput) {
        console.log('pokemonSpeciesOutput', pokemonSpeciesOutput);
        this.pokemonSpeciesOutput = pokemonSpeciesOutput;
    }

    getDescription() {
        return this.pokemonSpeciesOutput.flavor_text_entries[0].flavor_text.replace('\f', ' ');
    }

    getEvolutionChainURL() {
        return this.pokemonSpeciesOutput.evolution_chain.url.replace('https://pokeapi.co/api/v2', '');
    }
}
