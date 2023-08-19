import Joi from "joi";

export function examValidate(exam){
    const examSchema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
        duration: Joi.number().required(),
        maxScore: Joi.number().required(),
        passingScore: Joi.number().required(),
        groupId: Joi.string().required(),
    });

    const { error } = examSchema.validate(exam);
    return error ? error.message : false;
}