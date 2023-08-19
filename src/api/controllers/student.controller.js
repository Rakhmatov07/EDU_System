import { Student } from "../../models/student.model.js";
import { comparePayload, hashPayload } from "../../utils/bcrypt.js";
import { signPayload } from "../../utils/jwt.js";
import { loginValidate } from "../../validations/login.validation.js";
import { registerValidate } from "../../validations/register.validation.js";
import { redis } from "../../database/redis.js";
import { mailData, transporter } from "../../utils/emailVerification.js";
import { CustomError } from "../../utils/customError.js";

export async function register(req, res, next){
    try {
        const { firstname, lastname, email, password } = req.body;

        const isValid = registerValidate({ firstname, lastname, email, password });
        if(isValid) throw new CustomError(isValid, 400);

        const student = await Student.findOne({ email });
        if(student) throw new CustomError('Already Registered', 409);
    
        const code = Math.floor((Math.random()*1000000)+1);
        await redis.set(email, code, 'EX', 60);
        
        const emailData = mailData(email, 'Registration', 'Do you agree to registre?', `<b>Hey there!</b><br> Your verification code: ${code}.<br/>`);
        transporter.sendMail(emailData);

        const hashedPass = await hashPayload(password);
        await Student.create({ firstname, lastname, email, password: hashedPass });

        res.status(200).json({ message: 'Verify your email!' });
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next){
    try {
        const { email, password } = req.body;

        const isValid = loginValidate({ email, password });
        if(isValid) throw new CustomError(isValid, 400);

        const student = await Student.findOne({email});
        if(!student) throw new CustomError('Not Found', 404);

        const checkPass = await comparePayload(password, student.password);
        if(!checkPass) throw new CustomError('Invalid Password', 403);

        const token = signPayload({ payload: student._id });

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

export async function verify(req, res, next){
    try {
        const { email, code } = req.body;
        const redisCode = await redis.get(email);
        const student = await Student.findOne({ email });
      
        if(code != redisCode){
            await Student.findOneAndDelete({ email });
            throw new CustomError('Invalid Verification code!\nTry again!', 403);
        }

        const token = signPayload({ payload: student._id });

        res.cookie('token', token);
        res.status(201).json({ message: 'Successfully Registered' });
    } catch (error) {
        next(error);
    }
}