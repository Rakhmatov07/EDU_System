import { Schema, model } from "mongoose";

const examSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    maxScore: {
        type: Number,
        required: true
    },
    passingScore: {
        type: Number,
        required: true
    },
    groupId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Group'
    }
},
{
    timestamps: true
});

export const Exam = model('Exam', examSchema);