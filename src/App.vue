<template>
    <v-app>
        <v-app-bar app color="red" dark>
            <div class="d-flex align-center">
                <v-toolbar-title>{{ $t('pokedex') }}</v-toolbar-title>
            </div>

            <v-spacer></v-spacer>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>

        <error-dialog></error-dialog>
    </v-app>
</template>

<script>
import ErrorDialog from '@/components/dialog/ErrorDialog';

export default {
    components: {
        'error-dialog': ErrorDialog
    }
};
</script>
