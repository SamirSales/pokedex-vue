import PokemonHttpRequest from '@/http/PokemonHttpRequest';
import { PokemonTableDataHandler } from '@/store/modules/pokemonTable';

export default {
    refreshData(context) {
        const pageNumber = PokemonTableDataHandler.getPageNumber(context);
        const pageSize = PokemonTableDataHandler.getPageSize(context);

        PokemonTableDataHandler.startLoading(context);

        PokemonHttpRequest.getPageByNumberAndSize(pageNumber, pageSize)
            .then((pokemons) => {
                console.log('pokemons', pokemons);
                PokemonTableDataHandler.setItems(context, pokemons);
            })
            .catch((error) => {
                console.log('error', error);
            })
            .then(() => {
                PokemonTableDataHandler.stopLoading(context);
            });
    }
};
