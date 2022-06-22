import axios from "axios";
const API_URL = "http://localhost:3000/api/assignments/";

const getAllAssignments = () => {
    return axios.get(API_URL);
};

const getAssignment = (id) => {
    return axios.get(API_URL + id);
};

const createAssignment = (
    studentId,
    courseId,
    dateGiven,
    dateDue,
    isComplete,
    dateComplete,
    pointsPossible,
    pointsEarned
) => {
    return axios.post(API_URL, {
        studentId,
        courseId,
        dateGiven,
        dateDue,
        isComplete,
        dateComplete,
        pointsPossible,
        pointsEarned
    });
};

const AssignmentService = {
    getAllAssignments,
    getAssignment,
    createAssignment,
};

export default AssignmentService;
