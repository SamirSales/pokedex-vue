<template>
    <div class="about">
        <h1>{{ $t('aboutPage.title') }}</h1>
        <p>{{ $t('aboutPage.message') }}</p>

        <div class="div-links">
            <a class="github" href="https://github.com/SamirSales/pokedex" target="_blank">{{
                $t('aboutPage.linkMessage')
            }}</a>

            <div style="width: 100%; height: 20px"></div>

            <a class="linkedin" href="https://www.linkedin.com/in/samir-ribeiro-916a39a4/" target="_blank">LinkedIn</a>
        </div>

        <v-btn color="primary" dark outlined @click="goToHomePage()">
            <v-icon left>mdi-arrow-left</v-icon>Go back</v-btn
        >
    </div>
</template>

<script>
import { RouteHandler } from '@/router';

export default {
    methods: {
        goToHomePage() {
            RouteHandler.goToHomePage(this);
        }
    }
};
</script>

<style scoped>
.about {
    text-align: center;
    padding: 30px;
}

.about p {
    color: gray;
    margin: 30px;
}

.div-links {
    margin: 0 auto 55px auto;
}

a.github {
    text-decoration: none;
    display: block;
    margin: 0 auto;
    width: 180px;
    border: solid 1px black;
    padding: 10px 5px;
    color: white;
    background-color: black;
}

a.github:hover {
    color: black;
    background-color: white;
}

a.linkedin {
    text-decoration: none;
    display: block;
    margin: 0 auto;
    width: 180px;
    border: solid 1px #0e76a8;
    padding: 10px 5px;
    color: white;
    background-color: #0e76a8;
}

a.linkedin:hover {
    color: #0e76a8;
    background-color: white;
}
</style>
