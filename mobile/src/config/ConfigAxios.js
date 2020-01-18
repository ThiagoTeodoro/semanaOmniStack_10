import axios from 'axios';

const configAxios = axios.create({
    baseURL: 'http://192.168.100.4:3333'
})

export default configAxios;