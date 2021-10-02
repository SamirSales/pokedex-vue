import PokemonHttpRequest from '@/http/PokemonHttpRequest';
import { PokemonTableDataHandler } from '@/store/modules/pokemonTable';
import { ErrorDialogHandler } from '@/store/modules/errorDialog';

export default {
    refreshData(context) {
        const pageNumber = PokemonTableDataHandler.getPageNumber(context);
        const pageSize = PokemonTableDataHandler.getPageSize(context);

        PokemonTableDataHandler.startLoading(context);

        PokemonHttpRequest.getPageByNumberAndSize(pageNumber, pageSize)
            .then((pokemons) => {
                PokemonTableDataHandler.setItems(context, pokemons);
            })
            .catch((error) => {
                ErrorDialogHandler.showError(context, error);
                PokemonTableDataHandler.stopLoading(context);
            })
            .then(() => {
                PokemonTableDataHandler.stopLoading(context);
            });
    }
};
