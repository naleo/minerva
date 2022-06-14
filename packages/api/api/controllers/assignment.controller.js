const Assignment = require("../models/assignment");

exports.getAllAssignments = async (req, res) => {
    if (req.roles.includes("admin") || req.roles.includes("teacher")) {
        const assignments = await Assignment.find();
        res.send(assignments);
    } else {
        const assignments = await Assignment.find({ studentId: req.userID });
        res.send(assignments);
    }
}

exports.getSingleAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({ _id: req.params.id });
        if (req.userID == assignment.studentId || req.roles.includes("admin") || req.roles.includes("teacher")) {
            res.status(200);
            res.send(assignment);
        } else {
            res.status(403);
            res.send({ message: "Unauthorized" });
        }
    } catch {
        res.status(404);
        res.send({ error: "Assignment does not exist!" });
    }
}

exports.createAssignment = async (req, res) => {
    if (req.userID == req.body.studentId || req.roles.includes("admin") || req.roles.includes("teacher")) {
        const assignment = new Assignment({
            studentId: req.body.studentId,
            assignmentId: req.body.assignmentId,
            dateGiven: req.body.dateGiven,
            dateDue: req.body.dateDue,
            isComplete: req.body.isComplete,
            dateComplete: req.body.dateComplete,
            pointsPossible: req.body.pointsPossible,
            pointsEarned: req.body.pointsEarned,
            description: req.body.description,
        });
        await assignment.save();
        res.status(201);
        res.send(assignment);
    } else {
        res.status(403);
        res.send({ message: "Unauthorized!" });
    }
}

exports.updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({ _id: req.params.id });
        //allow teachers and admins to update assignment, students to update own.
        if(req.userID == assignment.studentId || req.roles.includes("admin") || req.roles.includes("teacher")){
            
            if (req.body.studentId) {
                assignment.studentId = req.body.studentId;
            }

            if (req.body.assignmentId) {
                assignment.assignmentId = req.body.assignmentId;
            }
            
            if (req.body.dateGiven) {
                assignment.dateGiven = req.body.dateGiven;
            }

            if (req.body.dateDue) {
                assignment.dateDue = req.body.dateDue;
            }
            
            if (req.body.isComplete) {
                assignment.isComplete = req.body.isComplete;
            }

            if (req.body.dateComplete) {
                assignment.dateComplete = req.body.dateComplete;
            }

            if (req.body.pointsPossible) {
                assignment.pointsPossible = req.body.pointsPossible;
            }

            if (req.body.pointsEarned) {
                assignment.pointsEarned = req.body.pointsEarned;
            }

            if (req.body.description) {
                assignment.description = req.body.description;
            }
            await assignment.save();
            res.send(assignment);
    } else {
        res.status(403);
        res.send({ message: "Unauthorized" });
    }
    } catch {
        res.status(404);
        res.send({ error: "Assignment does not exist!" });
    }
}

exports.deleteAssignment = async (req, res) => {
    try {
        if (req.roles.includes("admin") || req.roles.includes("teacher")) {
            await Assignment.deleteOne({_id: req.params.id })
            res.status(204).send()
        } else {
            res.status(403);
            res.send({ message: "Unauthorized" });
        }
    } catch {
        res.status(404)
        res.send({ error: "Assignment does not exist!" });
    }
}