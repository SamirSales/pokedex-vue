import HttpRequest from './HttpRequest';
import Configuration from '@/Configuration';
import PokemonDetailsModel from '@/model/PokemonDetailsModel';
import PokemonModel from '@/model/PokemonModel';
import PokemonEvolutionChainModel from '@/model/PokemonEvolutionChainModel';
PokemonModel;

export default {
    getPageByNumberAndSize(pageNumber, pageSize) {
        const initialPokemonNumber = pageSize * (pageNumber - 1) + 1;
        const promises = [];

        for (let i = 0; i < pageSize; i++) {
            if (initialPokemonNumber + i <= Configuration.MAX_NUMBER_OF_POKEMONS) {
                const promise = this.getByNameOrId(initialPokemonNumber + i);
                promises.push(promise);
            }
        }

        return Promise.all(promises).then((pokemonModels) => {
            return pokemonModels.sort((pokemon1, pokemon2) => pokemon1.id > pokemon2.id);
        });
    },

    getByNameOrId(nameOrId) {
        const url = '/pokemon/' + nameOrId;
        return HttpRequest.getRequest(url).then((response) => {
            return new PokemonModel(response.data);
        });
    },

    getMoreInfoById(pokemonId) {
        const url = '/pokemon-species/' + pokemonId;
        return HttpRequest.getRequest(url).then((response) => {
            return new PokemonDetailsModel(response.data);
        });
    },

    getEvolutionChainByURL(url) {
        return HttpRequest.getRequest(url).then((response) => {
            return new PokemonEvolutionChainModel(response.data);
        });
    }
};
