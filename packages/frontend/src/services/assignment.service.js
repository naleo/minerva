import axios from "axios";
const API_URL = "http://localhost:3000/api/assignments/"

const getAllAssignments = () => {
    return axios.get(API_URL + "");
}

const getAssignment = (id) => {
    return axios.get(API_URL + id);
}

const AssignmentService = {
    getAllAssignments,
    getAssignment
}

export default AssignmentService;