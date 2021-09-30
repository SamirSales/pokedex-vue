import Vue from 'vue';
import VueRouter from 'vue-router';
import PokeDexView from '../views/PokeDexView/PokeDexView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'PokeDexView',
        component: PokeDexView
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
