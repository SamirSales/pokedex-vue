<template>
    <div>
        <h1>{{ $t('pokedex') }}</h1>
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
