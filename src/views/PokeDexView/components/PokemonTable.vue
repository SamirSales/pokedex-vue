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
                    <tr v-for="pokemon in pokemons" :key="pokemon.id">
                        <td>#{{ pokemon.id }}</td>
                        <td><img :src="pokemon.sprites.front_default" /></td>
                        <td>{{ pokemon.name }}</td>
                        <td>{{ pokemon.types.map((type) => type.type.name).join(', ') }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-progress-linear v-show="isLoading" indeterminate color="teal"></v-progress-linear>

        <div class="text-center">
            <v-pagination v-model="pageNumber" :length="numberOfPages" :disabled="isLoading" circle></v-pagination>
        </div>
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
        }
    }
};
</script>
