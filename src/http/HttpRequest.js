import axios from './AxiosConfiguration';

export default {
    getRequest(urlSuffix) {
        return axios.get(urlSuffix);
    }
};
