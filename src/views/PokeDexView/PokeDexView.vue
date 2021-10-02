<template>
    <div>
        <pokemon-table @clickRow="onClickTableRow()"></pokemon-table>
        <pokemon-details-dialog v-model="shouldShowPokemonDetailsDialog"></pokemon-details-dialog>
    </div>
</template>

<script>
import PokemonTable from './components/PokemonTable.vue';
import PokemonDetailsDialog from './components/PokemonDetailsDialog.vue';

export default {
    components: {
        'pokemon-table': PokemonTable,
        'pokemon-details-dialog': PokemonDetailsDialog
    },

    data: () => ({
        shouldShowPokemonDetailsDialog: false
    }),

    methods: {
        onClickTableRow() {
            this.shouldShowPokemonDetailsDialog = true;
        }
    }
};
</script>
