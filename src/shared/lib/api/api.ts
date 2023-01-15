import axios from 'axios';

const baseURL = __IS_DEV__ ? 'http://localhost:3010/' : '';

export const $api = axios.create({
    baseURL,
});
