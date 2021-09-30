import StoreMutationsType from '@/store/StoreMutationsType';

export const PokemonTableDataHandler = {
    getItems(context) {
        return context.$store.getters.items;
    },

    setItems(context, items) {
        context.$store.commit(StoreMutationsType.SET_POKEMON_TABLE_ITEMS, items);
    },

    getPageNumber(context) {
        return context.$store.getters.pageNumber;
    },

    setPageNumber(context, pageNumber) {
        context.$store.commit(StoreMutationsType.SET_POKEMON_TABLE_PAGE_NUMBER, pageNumber);
    },

    getPageSize(context) {
        return context.$store.getters.pageSize;
    },

    setPageSize(context, pageSize) {
        context.$store.commit(StoreMutationsType.SET_POKEMON_TABLE_PAGE_SIZE, pageSize);
    },

    getSelectedPokemon(context) {
        return context.$store.getters.selectedPokemon;
    },

    setSelectedPokemon(context, selectedPokemon) {
        context.$store.commit(StoreMutationsType.SET_SELECTED_POKEMON, selectedPokemon);
    },

    isLoading(context) {
        return context.$store.getters.isLoading;
    },

    startLoading(context) {
        context.$store.commit(StoreMutationsType.SET_POKEMON_TABLE_LOADING_ON);
    },

    stopLoading(context) {
        context.$store.commit(StoreMutationsType.SET_POKEMON_TABLE_LOADING_OFF);
    }
};

const state = {
    items: [],
    pageNumber: 1,
    pageSize: 5,
    selectedPokemon: null,
    loading: false
};

const getters = {
    items: (state) => {
        return state.items;
    },

    pageNumber: (state) => {
        return state.pageNumber;
    },

    pageSize: (state) => {
        return state.pageSize;
    },

    selectedPokemon: (state) => {
        return state.selectedPokemon;
    },

    isLoading: (state) => {
        return state.loading;
    }
};

const mutations = {
    [StoreMutationsType.SET_POKEMON_TABLE_ITEMS]: (state, items) => {
        state.items = items;
    },

    [StoreMutationsType.SET_POKEMON_TABLE_PAGE_NUMBER]: (state, pageNumber) => {
        state.pageNumber = pageNumber;
    },

    [StoreMutationsType.SET_POKEMON_TABLE_PAGE_SIZE]: (state, pageSize) => {
        state.pageSize = pageSize;
    },

    [StoreMutationsType.SET_SELECTED_POKEMON]: (state, selectedPokemon) => {
        state.selectedPokemon = selectedPokemon;
    },

    [StoreMutationsType.SET_POKEMON_TABLE_LOADING_ON]: (state) => {
        state.loading = true;
    },

    [StoreMutationsType.SET_POKEMON_TABLE_LOADING_OFF]: (state) => {
        state.loading = false;
    }
};

export default {
    state,
    getters,
    mutations
};
