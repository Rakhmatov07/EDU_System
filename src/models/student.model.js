import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAllowed: {
        type: Boolean,
        default: false
    },
    groupId: {
        type: Schema.ObjectId
    },
},
{
    timestamps: true
});

export const Student = model('Student', studentSchema);