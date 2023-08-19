import { Group } from "../../models/group.model.js";
import { CustomError } from "../../utils/customError.js";
import { groupValidate } from "../../validations/group.validation.js";

export async function getGroups(req, res, next){
    try {
        const groups = await Group.find();
        res.status(200).json({ message: 'Success', groups });
    } catch (error) {
        next(error);
    }
}

export async function getGroup(req, res, next){
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);

        res.status(200).json({ message: 'Success', group });
    } catch (error) {
        next(error);
    }
}

export async function deleteGroup(req, res, next){
    try {
        const { groupId } = req.params;
        const deletedGroup = await Group.findByIdAndDelete(groupId);

        res.status(200).json({ message: 'Success', deletedGroup });
    } catch (error) {
        next(error);
    }
}

export async function createGroup(req, res, next){
    try {
        const { groupName } = req.body;

        const isValid = groupValidate({ groupName });
        if(isValid) throw new CustomError(isValid, 400);

        const group = await Group.findOne({ groupName });
        if(group) throw new CustomError(`${groupName} already exists`, 409);

        const newGroup = await Group.create({ groupName });

        res.status(201).json({ message: 'Success', newGroup });
    } catch (error) {
        next(error);
    }
}