import HttpRequest from './HttpRequest';

export default {
    getPageByNumberAndSize(pageNumber, pageSize) {
        const initialPokemonNumber = pageSize * (pageNumber - 1) + 1;
        const promises = [];

        for (let i = 0; i < pageSize; i++) {
            const promise = this.getByNameOrNumber(initialPokemonNumber + i);
            promises.push(promise);
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
