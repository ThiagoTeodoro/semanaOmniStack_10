import axios from 'axios';

const configAxios = axios.create({
    baseURL: 'http://localhost:3333'
})

export default configAxios;