import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8989/";

const login = (username, password) => {
    return axios
        .post(API_URL + "req/login", null, {
            params: {
                username: username,
                password: password
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        })
        .then((response) => {
            alert("login successful");
            console.log(JSON.stringify(response.data));
            if (response.data.accessToken) {
                window.localStorage.setItem("user", JSON.stringify(response.data));
                window.localStorage.setItem("username", username);
                window.localStorage.setItem("role", response.data.role);
                window.localStorage.setItem("isLoggedIn", true);
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getAllUsers = () => {
    return axios.get(API_URL + "api/user/users",
        {
            headers: authHeader()
        });
};

const getUserInfo = (id) => {
    return axios.get(API_URL + `api/user/${id}`,
        {
            headers: authHeader()
        });
};

const updateUser = (id, user) => {
    console.log('-----------------------------' + id);
    return axios.put(API_URL + `api/user/${id}`, user,
        {
            headers: authHeader()
        });
};

const deleteUser = (id) => {
    console.log('-----------------------------' + id);
    //await axios.delete(`http://localhost:8989/user/${id}`);
    return axios.delete(API_URL + `api/user/${id}`,
        {
            headers: authHeader()
        });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    login,
    logout,
    getUserInfo,
    getAllUsers,
    getCurrentUser,
    updateUser,
    deleteUser,
};

export default authService;