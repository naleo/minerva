import React, { useState, useEffect } from "react";
import AssignmentService from "../services/assignment.service";
import Assignment from "./Assignment";

const AssignmentsPage = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        AssignmentService.getAllAssignments().then(
            (response) => {
                setContent(
                    response.data.map((item, index) => {
                        return (
                            <Assignment key={index} assignment={item} />
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
    });

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Student</th>
                        <th scope="col" class="px-6 py-3">Course</th>
                        <th scope="col" class="px-6 py-3">Date Given</th>
                        <th scope="col" class="px-6 py-3">Date Due</th>
                        <th scope="col" class="px-6 py-3">Completed</th>
                        <th scope="col" class="px-6 py-3">Date Completed</th>
                        <th scope="col" class="px-6 py-3">Points Possible</th>
                        <th scope="col" class="px-6 py-3">Points Earned</th>
                    </tr>
                </thead>
                <tbody>{content}</tbody>
            </table>
        </div>
    );
};

export default AssignmentsPage;
