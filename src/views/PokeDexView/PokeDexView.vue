<template>
    <div>
        <pokemon-table></pokemon-table>
    </div>
</template>

<script>
import PokemonTable from './components/PokemonTable.vue';

export default {
    components: {
        'pokemon-table': PokemonTable
    }
};
</script>
