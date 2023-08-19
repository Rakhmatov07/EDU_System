import Joi from "joi";

export function projectValidate(project){
    const projectSchema = Joi.object({
        projectName: Joi.string().required(),
        groupId: Joi.string().required(),
        examId: Joi.string().required()
    });

    const { error } = projectSchema.validate(project);
    return error ? error.message : false;
}