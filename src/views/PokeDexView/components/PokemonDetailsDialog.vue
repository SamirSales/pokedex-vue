<template>
    <v-dialog
        :value="value"
        max-width="600px"
        @input="$emit('input', arguments[0])"
        @click:outside="$emit('input', false)"
    >
        <v-card v-if="selectedPokemon != null">
            <v-card-title>
                <span class="text-h5">
                    {{ formatedPokemonName }} <span style="color: #c0c0c0">#{{ selectedPokemon.id }}</span>
                </span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="4" md="4">
                            <img :src="selectedPokemon.sprites.front_default" height="96" width="96"
                        /></v-col>

                        <v-col cols="12" sm="4" md="4">
                            <span class="pokemon-point" v-for="point in pokemonPoints" :key="point.name">
                                <b>{{ $t('pokemonPointType.' + point.name) }}:</b> {{ point.value }}
                            </span>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                            <b>{{ $t('height') }}:</b> {{ selectedPokemon.height / 10 }} m <br />
                            <b>{{ $t('weight') }}:</b> {{ selectedPokemon.weight / 10 }} kg <br />
                            <b>{{ $t('baseExperience') }}:</b> {{ selectedPokemon.base_experience }}
                        </v-col>

                        <v-col cols="12">
                            <pokemon-type-chip
                                v-for="type in selectedPokemon.types"
                                :type="type.type.name"
                                :key="type.type.name + selectedPokemon.id"
                            ></pokemon-type-chip>
                        </v-col>

                        <v-col cols="12">
                            <b>{{ $t('description') }}</b>
                            <br />
                            {{ description }}
                        </v-col>

                        <v-col cols="12" v-show="hasEvolution">
                            <b>{{ $t('chainOfEvolution') }}</b>
                            <pokemon-evolution-chain :evolutionChain="evolutionChain"></pokemon-evolution-chain>
                        </v-col>

                        <v-col cols="12">
                            <b>{{ $t('games') }}</b>
                            <br />
                            {{ selectedPokemon.game_indices.map((gi) => gi.version.name).join(', ') }}
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="$emit('input', false)"> {{ $t('close') }} </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { PokemonTableDataHandler } from '@/store/modules/pokemonTable';
import PokemonHttpRequest from '@/http/PokemonHttpRequest';
import PokemonEvolutionChain from './PokemonEvolutionChain.vue';
import PokemonTypeChip from './PokemonTypeChip.vue';

export default {
    components: {
        'pokemon-evolution-chain': PokemonEvolutionChain,
        'pokemon-type-chip': PokemonTypeChip
    },

    props: {
        value: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        pokemonDetailsModel: null,
        evolutionChain: null
    }),

    computed: {
        formatedPokemonName() {
            const name = this.selectedPokemon.name;
            return name.charAt(0).toUpperCase() + name.slice(1);
        },

        pokemonPoints() {
            return this.selectedPokemon.stats.map((st) => {
                return { name: st.stat.name, value: st.base_stat };
            });
        },

        pokemonNumber() {
            if (this.selectedPokemon == null) {
                return null;
            }
            return this.selectedPokemon.id;
        },

        selectedPokemon() {
            return PokemonTableDataHandler.getSelectedPokemon(this);
        },

        description() {
            if (this.pokemonDetailsModel == null) {
                return '...';
            }

            return this.pokemonDetailsModel.getDescription();
        },

        hasEvolution() {
            return this.evolutionChain != null && this.evolutionChain.hasEvolution();
        }
    },

    watch: {
        pokemonNumber() {
            this.refreshInformations();
        },

        value(visible) {
            if (!visible) {
                this.pokemonDetailsModel = null;
                this.evolutionChain = null;
            }
        }
    },

    methods: {
        refreshInformations() {
            if (this.pokemonNumber != null) {
                PokemonHttpRequest.getMoreInfoByNumber(this.pokemonNumber).then((pokemonDetailsModel) => {
                    this.pokemonDetailsModel = pokemonDetailsModel;
                    this.refreshEvolutionChain();
                });
            }
        },

        refreshEvolutionChain() {
            if (this.pokemonDetailsModel != null) {
                const url = this.pokemonDetailsModel.getEvolutionChainURL();
                PokemonHttpRequest.getEvolutionChainByURL(url).then((evolutionChain) => {
                    this.evolutionChain = evolutionChain;
                });
            }
        }
    }
};
</script>

<style scoped>
.pokemon-point::after {
    content: '\a';
    white-space: pre;
}
</style>
