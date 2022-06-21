import React, { useState } from 'react';

const AssignmentListItem = ({assignment}) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{assignment.studentId}</td>
            <td className="px-6 py-4">{assignment.courseId}</td>
            <td className="px-6 py-4">{assignment.dateGiven}</td>
            <td className="px-6 py-4">{assignment.dateDue}</td>
            <td className="px-6 py-4">{assignment.isComplete}</td>
            <td className="px-6 py-4">{assignment.dateComplete}</td>
            <td className="px-6 py-4">{assignment.pointsPossible}</td>
            <td className="px-6 py-4">{assignment.pointsEarned}</td>
        </tr>
    );
}

export default AssignmentListItem;