import Vue from 'vue';
import Vuex from 'vuex';

import pokemonTable from '@/store/modules/pokemonTable';
import errorDialog from '@/store/modules/errorDialog';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        errorDialog,
        pokemonTable
    }
});
