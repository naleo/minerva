import axios from "axios";
const API_URL = "http://localhost:3000/api/users/"

const getAllUsers = () => {
    return axios.get(API_URL + "");
}

const getUser = (id) => {
    return axios.get(API_URL + id);
}