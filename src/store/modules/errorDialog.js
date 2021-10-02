import StoreMutationsType from '@/store/StoreMutationsType';

export const ErrorDialogHandler = {
    showError(context, error) {
        this.setError(context, error);
        this.show(context);
    },

    setError(context, error) {
        context.$store.commit(StoreMutationsType.SET_ERROR_DIALOG, error);
    },

    getErrorMessage(context) {
        return context.$store.getters.error;
    },

    isVisible(context) {
        return context.$store.getters.isVisible;
    },

    show(context) {
        context.$store.commit(StoreMutationsType.SHOW_ERROR_DIALOG);
    },

    hide(context) {
        context.$store.commit(StoreMutationsType.HIDE_ERROR_DIALOG);
    }
};

const state = {
    visible: false,
    error: null
};

const getters = {
    error: (state) => {
        return state.error;
    },

    isVisible: (state) => {
        return state.visible;
    }
};

const mutations = {
    [StoreMutationsType.SET_ERROR_DIALOG]: (state, error) => {
        state.error = error;
    },

    [StoreMutationsType.SHOW_ERROR_DIALOG]: (state) => {
        state.visible = true;
    },

    [StoreMutationsType.HIDE_ERROR_DIALOG]: (state) => {
        state.visible = false;
    }
};

export default {
    state,
    getters,
    mutations
};
