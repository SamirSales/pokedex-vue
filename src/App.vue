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
    </v-app>
</template>
