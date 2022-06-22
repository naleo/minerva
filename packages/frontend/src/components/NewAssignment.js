import React, { useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import DatePicker from "react-datepicker";
import CheckButton from "react-validation/build/button";
import AssignmentService from "../services/assignment.service";
import { isEmail } from "validator";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-sm font-medium mt-1 block text-red-500">
                This field is required!
            </div>
        );
    }
};

const NewAssignment = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [studentId, setStudentId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [dateGiven, setDateGiven] = useState(new Date());
    const [dateDue, setDateDue] = useState(new Date());
    const [isComplete, setIsComplete] = useState(false);
    const [dateCompleted, setDateCompleted] = useState(new Date());
    const [pointsPossible, setPointsPossible] = useState();
    const [pointsEarned, setPointsEarned] = useState();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onChangeStudentId = e => setStudentId(e.target.value);
    const onChangeCourseId = e => setCourseId(e.target.value);
    const onChangeDateGiven = date => setDateGiven(date);
    const onChangeDateDue = date => setDateDue(date);
    const onChangeIsComplete = e => setIsComplete(e.target.value);
    const onChangeDateCompleted = date => setDateCompleted(date);
    const onChangePointsPossible = e => setPointsPossible(e.target.value);
    const onChangePointsEarned = e => setPointsEarned(e.target.value);

    const handleCreate = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();
        
        if (checkBtn.current.context._errors.length === 0) {
            AssignmentService.createAssignment(
                studentId,
                courseId,
                dateGiven,
                dateDue,
                isComplete,
                dateCompleted,
                pointsPossible,
                pointsEarned
                )
                .then(
                    (response) => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                        navigate("/assignments")
                    },
                    (error) => {
                        const resMessage = 
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        setMessage(resMessage);
                        setSuccessful(false);
                    }
                )
        }


    };
    return (
        <div className="p-4 m-auto max-w-sm bg-white rounded-lg overflow-hidden shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <Form onSubmit={handleCreate} ref={form} className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                    Create New Assignment
                </h5>
                <div>
                    <label
                        htmlFor="studentId"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Student ID
                    </label>
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="studentId"
                        value={studentId}
                        onChange={onChangeStudentId}
                    />
                    <label
                        htmlFor="courseId"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Course ID
                    </label>
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="courseId"
                        value={courseId}
                        onChange={onChangeCourseId}
                    />
                    <label
                        htmlFor="dateGiven"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Date Given
                    </label>
                    <DatePicker
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="dateGiven"
                        selected={dateGiven}
                        onChange={onChangeDateGiven}
                    />
                    <label
                        htmlFor="dateDue"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Date Due
                    </label>
                    <DatePicker
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="dateDue"
                        selected={dateDue}
                        onChange={onChangeDateDue}
                    />
                    <label
                        htmlFor="isComplete"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Completed
                    </label>
                    <Input
                        type="checkbox"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="isComplete"
                        value={isComplete}
                        onChange={onChangeIsComplete}
                    />
                    <label
                        htmlFor="dateCompleted"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Date Completed
                    </label>
                    <DatePicker
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="dateCompleted"
                        selected={dateCompleted}
                        onChange={onChangeDateCompleted}
                    />
                    <label
                        htmlFor="pointsPossible"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Points Possible
                    </label>
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="pointsPossible"
                        value={pointsPossible}
                        onChange={onChangePointsPossible}
                    />
                    <label
                        htmlFor="pointsEarned"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Points Earned
                    </label>
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="pointsEarned"
                        value={pointsEarned}
                        onChange={onChangePointsEarned}
                    />
                </div>
                <div>
                    <button
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus-outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:outline-none">
                            <span>Create</span>
                        </button>
                </div>
                {message && (
                    <div>
                        <div>
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    );
};

export default NewAssignment;
