<template>
    <v-chip class="ma-1" :color="color" label outlined>
        {{ $t('pokemonType.' + type) }}
    </v-chip>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: ''
        }
    },

    computed: {
        color() {
            switch (this.type) {
                case 'normal':
                    return 'blue-grey lighten-3';
                case 'fighting':
                    return 'pink lighten-3';
                case 'flying':
                    return 'blue accent-1';

                case 'poison':
                    return 'purple lighten-3';
                case 'ground':
                    return 'yellow darken-4';
                case 'rock':
                    return 'brown lighten-4';

                case 'bug':
                    return 'light-green lighten-3';
                case 'ghost':
                    return 'light-blue darken-3';
                case 'steel':
                    return 'teal lighten-3';

                case 'water':
                    return 'light-blue accent-2';
                case 'fire':
                    return 'amber darken-1';
                case 'grass':
                    return 'green darken-2';

                case 'electric':
                    return 'yellow lighten-1';
                case 'psychic':
                    return 'red lighten-3';
                case 'ice':
                    return 'cyan lighten-4';

                case 'dragon':
                    return 'light-blue darken-1';
                case 'dark':
                    return 'grey darken-1';
                case 'fairy':
                    return 'pink lighten-4';

                default:
                    return 'orange';
            }
        }
    }
};
</script>
