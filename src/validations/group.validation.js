import Joi from "joi";

export function groupValidate(group){
    const groupSchema = Joi.object({
        groupName: Joi.string().min(3).required()
    });

    const { error } = groupSchema.validate(group);
    return error ? error.message : false;
}