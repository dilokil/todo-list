import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = '/api/test/';
const TODO_API_URL = '/api/todo/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(TODO_API_URL + 'boards', { headers: authHeader() });
    }

    saveUserBoards(boards) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json', ...authHeader()},
            body: JSON.stringify(boards),
        }
        return fetch(TODO_API_URL + 'boards/save', requestOptions);
        // return axios
        //     .post(TODO_API_URL + 'boards/save', { boards: [...boards] }, {headers: authHeader()});
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();