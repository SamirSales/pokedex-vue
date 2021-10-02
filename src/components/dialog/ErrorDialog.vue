<template>
    <v-row justify="center">
        <v-dialog :value="visible" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h5">An error has occurred</v-card-title>
                <v-card-text>{{ errorMessage }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <close-button @click="onClickCloseButton()"></close-button>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { ErrorDialogHandler } from '@/store/modules/errorDialog';
import CloseButton from '@/components/button/CloseButton';

export default {
    components: {
        'close-button': CloseButton
    },

    computed: {
        visible() {
            return ErrorDialogHandler.isVisible(this);
        },

        errorMessage() {
            return ErrorDialogHandler.getErrorMessage(this);
        }
    },

    methods: {
        onClickCloseButton() {
            ErrorDialogHandler.hide(this);
        }
    }
};
</script>
