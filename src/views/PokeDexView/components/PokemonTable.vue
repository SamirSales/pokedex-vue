<template>
    <div>
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">{{ $t('number') }}</th>
                        <th class="text-left">{{ $t('image') }}</th>
                        <th class="text-left">{{ $t('name') }}</th>
                        <th class="text-left">{{ $t('type') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="pokemon-table-row" v-for="pokemon in pokemons" :key="pokemon.id">
                        <td>#{{ pokemon.id }}</td>
                        <td>
                            <img :src="pokemon.sprites.front_default" height="96" width="96" />
                        </td>
                        <td>{{ getFormatedName(pokemon.name) }}</td>
                        <td>{{ pokemon.types.map((type) => type.type.name).join(', ') }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <div class="text-center">
            <v-pagination
                :value="pageNumber"
                :length="numberOfPages"
                :disabled="isLoading"
                color="red"
                circle
                @input="onChangePageNumber(arguments[0])"
            ></v-pagination>
        </div>

        <v-progress-linear v-show="isLoading" indeterminate color="teal"></v-progress-linear>
    </div>
</template>

<script>
import { PokemonTableDataHandler } from '@/store/modules/pokemonTable';
import PokemonStoreHttpRequest from '@/facade/PokemonStoreHttpRequest';

export default {
    computed: {
        numberOfPages() {
            return 150 / this.pageSize;
        },

        pokemons() {
            return PokemonTableDataHandler.getItems(this);
        },

        pageNumber() {
            return PokemonTableDataHandler.getPageNumber(this);
        },

        pageSize() {
            return PokemonTableDataHandler.getPageSize(this);
        },

        isLoading() {
            return PokemonTableDataHandler.isLoading(this);
        }
    },

    created() {
        PokemonStoreHttpRequest.refreshData(this);
    },

    methods: {
        getFormatedName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },

        onChangePageNumber(pageNumber) {
            PokemonTableDataHandler.setPageNumber(this, pageNumber);
            PokemonStoreHttpRequest.refreshData(this);
        }
    }
};
</script>

<style scoped>
.pokemon-table-row td {
    width: 25%;
}
</style>
