import InternationalizationHandler from '@/handlers/InternationalizationHandler';

export default class PokemonDetailsModel {
    constructor(dataResponse) {
        this.dataResponse = dataResponse;
    }

    getDescription() {
        return this.dataResponse.flavor_text_entries
            .filter((fte) => {
                return fte.language.name === InternationalizationHandler.getCurrentLocale();
            })[0]
            .flavor_text.replace('\f', ' ');
    }

    getEvolutionChainURL() {
        return this.dataResponse.evolution_chain.url.replace('https://pokeapi.co/api/v2', '');
    }
}
