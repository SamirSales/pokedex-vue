<template>
    <v-dialog :value="value" max-width="600px" @input="$emit('input', arguments[0])" @click:outside="close()">
        <v-card v-if="selectedPokemon != null">
            <v-card-title>
                <span class="text-h5">
                    {{ selectedPokemon.name }} <span style="color: #c0c0c0">#{{ selectedPokemon.id }}</span>
                </span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="4" md="4">
                            <img :src="selectedPokemon.imageURL" height="96" width="96"
                        /></v-col>

                        <v-col cols="12" sm="4" md="4">
                            <span class="pokemon-point" v-for="point in selectedPokemon.points" :key="point.name">
                                <b>{{ $t('pokemonPointType.' + point.name) }}:</b> {{ point.value }}
                            </span>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                            <b>{{ $t('height') }}:</b> {{ selectedPokemon.heightInMeters }} m <br />
                            <b>{{ $t('weight') }}:</b> {{ selectedPokemon.weightInKg }} kg <br />
                            <b>{{ $t('baseExperience') }}:</b> {{ selectedPokemon.baseExperience }}
                        </v-col>

                        <v-col cols="12">
                            <pokemon-type-chip
                                v-for="type in selectedPokemon.types"
                                :type="type.type.name"
                                :key="type.type.name + selectedPokemon.id"
                            ></pokemon-type-chip>
                        </v-col>

                        <v-col v-if="hasDescription" cols="12">
                            <b>{{ $t('description') }}</b>
                            <br />
                            {{ description }}
                        </v-col>

                        <v-col cols="12" v-show="hasEvolution">
                            <b>{{ $t('chainOfEvolution') }}</b>
                            <pokemon-evolution-chain :evolutionChain="evolutionChainModel"></pokemon-evolution-chain>
                        </v-col>

                        <v-col cols="12">
                            <b>{{ $t('games') }}</b>
                            <br />
                            {{ selectedPokemon.gameNames.join(', ') }}
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <close-button @click="close()"></close-button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { ErrorDialogHandler } from '@/store/modules/errorDialog';
import { PokemonTableDataHandler } from '@/store/modules/pokemonTable';

import PokemonHttpRequest from '@/http/PokemonHttpRequest';
import PokemonEvolutionChain from './PokemonEvolutionChain.vue';
import PokemonTypeChip from './PokemonTypeChip.vue';
import CloseButton from '@/components/button/CloseButton';

export default {
    components: {
        'pokemon-evolution-chain': PokemonEvolutionChain,
        'pokemon-type-chip': PokemonTypeChip,
        'close-button': CloseButton
    },

    props: {
        value: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        pokemonDetailsModel: null,
        evolutionChainModel: null
    }),

    computed: {
        pokemonId() {
            if (this.selectedPokemon == null) {
                return null;
            }
            return this.selectedPokemon.id;
        },

        selectedPokemon() {
            return PokemonTableDataHandler.getSelectedPokemon(this);
        },

        hasDescription() {
            return this.description != null;
        },

        description() {
            if (this.pokemonDetailsModel == null) {
                return null;
            }

            return this.pokemonDetailsModel.getDescription();
        },

        hasEvolution() {
            return this.evolutionChainModel != null && this.evolutionChainModel.hasEvolution();
        }
    },

    watch: {
        value(visible) {
            if (!visible) {
                this.pokemonDetailsModel = null;
                this.evolutionChainModel = null;
            } else {
                this.refreshInformations();
            }
        }
    },

    methods: {
        refreshInformations() {
            if (this.pokemonId != null) {
                PokemonHttpRequest.getMoreInfoById(this.pokemonId)
                    .then((pokemonDetailsModel) => {
                        this.pokemonDetailsModel = pokemonDetailsModel;
                        this.refreshEvolutionChain();
                    })
                    .catch((error) => {
                        ErrorDialogHandler.showError(this, error);
                    });
            }
        },

        refreshEvolutionChain() {
            if (this.pokemonDetailsModel != null) {
                const url = this.pokemonDetailsModel.getEvolutionChainURL();
                PokemonHttpRequest.getEvolutionChainByURL(url)
                    .then((evolutionChainModel) => {
                        this.evolutionChainModel = evolutionChainModel;
                    })
                    .catch((error) => {
                        ErrorDialogHandler.showError(this, error);
                    });
            }
        },

        close() {
            this.$emit('input', false);
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
