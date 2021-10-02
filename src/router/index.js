import Vue from 'vue';
import VueRouter from 'vue-router';
import PokeDexView from '../views/PokeDexView/PokeDexView.vue';

Vue.use(VueRouter);

const Route = {
    HOME: '/',
    ABOUT: '/about'
};

const routes = [
    {
        path: Route.HOME,
        name: 'PokeDexView',
        component: PokeDexView
    },
    {
        path: Route.ABOUT,
        name: 'AboutView',
        component: () => import('../views/AboutView.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;

export const RouteHandler = {
    goToHomePage(context) {
        goToRouteIfNotThereYet(context, Route.HOME);
    },

    goToAboutPage(context) {
        goToRouteIfNotThereYet(context, Route.ABOUT);
    }
};

const goToRouteIfNotThereYet = (context, route) => {
    if (context.$route.path != route) {
        context.$router.push(route);
    }
};
