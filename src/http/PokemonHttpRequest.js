import HttpRequest from './HttpRequest';
import Configuration from '@/Configuration';

export default {
    getPageByNumberAndSize(pageNumber, pageSize) {
        const initialPokemonNumber = pageSize * (pageNumber - 1) + 1;
        const promises = [];

        for (let i = 0; i < pageSize; i++) {
            if (initialPokemonNumber + i <= Configuration.MAX_NUMBER_OF_POKEMONS) {
                const promise = this.getByNameOrNumber(initialPokemonNumber + i);
                promises.push(promise);
            }
        }

        return Promise.all(promises).then((responses) => {
            const dataList = responses.map((response) => response.data);
            return dataList.sort((pokemon1, pokemon2) => pokemon1.id > pokemon2.id);
        });
    },

    getByNameOrNumber(nameOrNumber) {
        const url = '/pokemon/' + nameOrNumber;
        return HttpRequest.getRequest(url);
    }
};
