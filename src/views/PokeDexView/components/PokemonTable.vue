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
                v-model="pageNumber"
                :length="numberOfPages"
                :disabled="isLoading"
                color="red"
                circle
            ></v-pagination>
        </div>

        <v-progress-linear v-show="isLoading" indeterminate color="teal"></v-progress-linear>
    </div>
</template>

<script>
import PokemonHttpRequest from '@/http/PokemonHttpRequest';

export default {
    data: () => ({
        pokemons: [],
        pageNumber: 1,
        pageSize: 5,
        isLoading: false
    }),

    computed: {
        numberOfPages() {
            return 150 / this.pageSize;
        }
    },

    watch: {
        pageNumber() {
            this.refreshTable();
        }
    },

    created() {
        this.refreshTable();
    },

    methods: {
        refreshTable() {
            this.isLoading = true;

            PokemonHttpRequest.getPageByNumberAndSize(this.pageNumber, this.pageSize)
                .then((response) => {
                    console.log('response', response);
                    this.pokemons = response;
                })
                .catch((error) => {
                    console.log('error', error);
                })
                .then(() => {
                    this.isLoading = false;
                });
        },

        getFormatedName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    }
};
</script>

<style scoped>
.pokemon-table-row td {
    width: 25%;
}
</style>
