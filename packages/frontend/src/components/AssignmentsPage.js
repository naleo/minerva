import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AssignmentService from "../services/assignment.service";
import AssignmentListItem from "./AssignmentListItem";

const AssignmentsPage = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        AssignmentService.getAllAssignments().then(
            (response) => {
                setContent(
                    response.data.map((item, index) => {
                        return (
                            <AssignmentListItem key={index} assignment={item} />
                        );
                    })
                );
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    },[]);

    return (
        <div className="relative flex flex-col overflow-x-auto shadow-md sm:rounded-lg">
            <Link to={"/assignments/new"}
                className="inline-block m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus-outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:outline-none self-end"
            >New Assignment</Link>
            <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Details</th>
                        <th scope="col" className="px-6 py-3">Student</th>
                        <th scope="col" className="px-6 py-3">Course</th>
                        <th scope="col" className="px-6 py-3">Date Given</th>
                        <th scope="col" className="px-6 py-3">Date Due</th>
                        <th scope="col" className="px-6 py-3">Completed</th>
                        <th scope="col" className="px-6 py-3">Date Completed</th>
                        <th scope="col" className="px-6 py-3">Points Possible</th>
                        <th scope="col" className="px-6 py-3">Points Earned</th>
                    </tr>
                </thead>
                <tbody>{content}</tbody>
            </table>
        </div>
    );
};

export default AssignmentsPage;
