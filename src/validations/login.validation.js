import Joi from "joi";

export function loginValidate(user){
    const loginSchema = Joi.object({
        email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
    });

    const { error } = loginSchema.validate(user);
    return error ? error.message : false;
}