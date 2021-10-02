<template>
    <v-app>
        <main-screen-toolbar></main-screen-toolbar>

        <v-main>
            <router-view />
        </v-main>

        <error-dialog></error-dialog>
    </v-app>
</template>

<script>
import ErrorDialog from '@/components/dialog/ErrorDialog';
import MainScreenToolbar from '@/components/mainScreen/MainScreenToolbar';

export default {
    components: {
        'error-dialog': ErrorDialog,
        'main-screen-toolbar': MainScreenToolbar
    }
};
</script>
