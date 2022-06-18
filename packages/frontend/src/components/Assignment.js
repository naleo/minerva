import React, { useState } from 'react';

const Assignment = ({assignment}) => {
    return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="px-6 py-4">{assignment.studentId}</td>
            <td class="px-6 py-4">{assignment.courseId}</td>
            <td class="px-6 py-4">{assignment.dateGiven}</td>
            <td class="px-6 py-4">{assignment.dateDue}</td>
            <td class="px-6 py-4">{assignment.isComplete}</td>
            <td class="px-6 py-4">{assignment.dateComplete}</td>
            <td class="px-6 py-4">{assignment.pointsPossible}</td>
            <td class="px-6 py-4">{assignment.pointsEarned}</td>
        </tr>
    );
}

export default Assignment;