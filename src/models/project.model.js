import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    isPassed: {
        type: Boolean,
        default: false
    },
    studentComment: {
        type: String
    },
    teacherComment: {
        type: String
    },
    attempts: {
        type: Number,
        default: 3
    },
    studentId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Student'
    },
    groupId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Group'
    },
    examId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Exam'
    }
},
{
    timestamps: true
});

export const Project = model('Project', projectSchema);