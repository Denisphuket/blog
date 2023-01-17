import axios from 'axios';

const baseURL = __IS_DEV__ ? 'http://localhost:3010/' : process.env.REACT_APP_SERVER_URL;

export const $api = axios.create({
    baseURL,
});
