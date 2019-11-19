import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-7ce15.firebaseio.com/',
});

export default instance;