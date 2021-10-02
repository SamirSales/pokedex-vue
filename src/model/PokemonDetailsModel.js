export default class PokemonDetailsModel {
    constructor(dataResponse) {
        console.log('PokemonDetailsModel', dataResponse);
        this.dataResponse = dataResponse;
    }

    getDescription() {
        return this.dataResponse.flavor_text_entries[0].flavor_text.replace('\f', ' ');
    }

    getEvolutionChainURL() {
        return this.dataResponse.evolution_chain.url.replace('https://pokeapi.co/api/v2', '');
    }
}
