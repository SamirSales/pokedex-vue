import axios from 'axios';
import InternationalizationHandler, { Locale } from '@/handlers/InternationalizationHandler';

const BASE_URL = 'https://pokeapi.co/api/v2';

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept-Language': 'en'
};

const axiosClient = () => {
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: DEFAULT_HEADERS
    });

    instance.interceptors.request.use((config) => {
        config.headers['Accept-Language'] = getAcceptLanguage();
        return config;
    });

    return instance;
};

export default axiosClient();

const getAcceptLanguage = () => {
    switch (InternationalizationHandler.getCurrentLocale()) {
        case Locale.FR:
            return 'fr';

        default:
            return 'en';
    }
};
