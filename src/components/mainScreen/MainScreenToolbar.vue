<template>
    <v-app-bar app color="red" dark>
        <div class="d-flex align-center">
            <v-toolbar-title>{{ $t('pokedex') }}</v-toolbar-title>
        </div>

        <v-spacer></v-spacer>

        <v-btn icon @click="onClickInfoIconButton()">
            <v-icon>mdi-information-outline</v-icon>
        </v-btn>

        <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" outlined>
                    {{ currentIdiomText }}
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="idiom in idioms" :key="idiom.locale" @click="selectIdiom(idiom)">
                    <v-list-item-title>
                        <v-icon>{{ getIconByIdiom(idiom) }}</v-icon>
                        {{ idiom.text }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import InternationalizationHandler from '@/handlers/InternationalizationHandler';
import { RouteHandler } from '@/router';

export default {
    computed: {
        idioms() {
            return InternationalizationHandler.getIdioms();
        },

        currentIdiomText() {
            return InternationalizationHandler.getCurrentIdiomText();
        }
    },

    methods: {
        selectIdiom(idiom) {
            InternationalizationHandler.setLocale(idiom.locale);
        },

        getIconByIdiom(idiom) {
            if (this.isCurrentIdiom(idiom)) {
                return 'mdi-radiobox-marked';
            }
            return 'mdi-radiobox-blank';
        },

        isCurrentIdiom(idiom) {
            return InternationalizationHandler.getCurrentLocale() === idiom.locale;
        },

        onClickInfoIconButton() {
            RouteHandler.goToAboutPage(this);
        }
    }
};
</script>
