import Vue from 'vue';
import Vuex from 'vuex';

import pokemonTable from '@/store/modules/pokemonTable';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        pokemonTable
    }
});
