import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AssignmentService from "../services/assignment.service";

const AssignmentPage = () => {
    const [content, setContent] = useState("");
    const { assignmentId } = useParams();
    useEffect(() => {
        AssignmentService.getAssignment(assignmentId).then(
            (res) => {
                setContent(res.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="m-auto p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Assignment Details
                </h5>
            </div>
            <div>
                <ul
                    role="list"
                    className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Student ID
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {content.studentId}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Course ID
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {content.courseId}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Date Given
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {content.dateGiven}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Date Due
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {content.dateDue}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Completed
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {content.isComplete}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Date Completed
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {content.dateComplete}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Points Possible
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {content.pointsPossible}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Points Earned
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {content.pointsEarned}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default AssignmentPage;
