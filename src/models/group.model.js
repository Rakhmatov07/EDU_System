import { Schema, model } from "mongoose";

const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

export const Group = model('Group', groupSchema);