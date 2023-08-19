import { Admin } from "../../models/admin.model.js";
import { comparePayload } from "../../utils/bcrypt.js";
import { CustomError } from "../../utils/customError.js";
import { signPayload } from "../../utils/jwt.js";
import { loginValidate } from "../../validations/login.validation.js";

export async function login(req, res, next){
    try {
        const { email, password } = req.body;

        const isValid = loginValidate({ email, password });
        if(isValid) throw new CustomError(isValid, 400);
        
        const admin = await Admin.findOne({email});
        if(!admin) throw new CustomError('Not Found', 404);
        
        const checkPass = await comparePayload(password, admin.password);
        if(!checkPass) throw new CustomError('Invalid Password', 403);
        
        const token = signPayload({ payload: admin._id });

        res.cookie('token', token);
        res.status(200).json({ message: 'Successfully logged In' });
    } catch (error) {
        next(error);
    }
}

export async function logout(_, res, next){
    try {
        res.cookie('token', '');
        res.status(200).json({ message: 'Successfully logged Out' });
    } catch (error) {
        next(error);
    }
}