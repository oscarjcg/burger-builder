import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-hamburger-project.firebaseio.com/'
});

export default instance;