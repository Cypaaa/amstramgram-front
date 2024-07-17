import fetch from "node-fetch";
import config from "../config/config.mjs";

const ENDPOINT = `${config.apiUrl}/users`

const getUserSelf = async (token) => {
    const response = await fetch(`${ENDPOINT}/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

const getUsers = async (token) => {
    const response = await fetch(ENDPOINT, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

const getUser = async (token, uuid) => {
    const response = await fetch(`${ENDPOINT}/${uuid}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

const Login = async (username, email, password) => {
    const response = await fetch(`${config.apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Authorization': null,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    });
    return await response.json();
};

const userService = {
    getUserSelf,
    getUsers,
    getUser,
    Login
};

export default userService;