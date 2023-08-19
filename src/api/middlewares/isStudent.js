import { Student} from "../../models/student.model.js";
import { CustomError } from "../../utils/customError.js";
import { verifyPayload } from "../../utils/jwt.js";

export async function isStudent(req, _, next) {
    try {
        const { token } = req.cookies;
        const studentId = verifyPayload(token).payload;
        if(!studentId) throw new CustomError("Invalid Token", 403); // Use CutomError to return error response
        
        const student = await Student.findOne({ _id: studentId });
        if(!student) throw new CustomError('Student Not Found', 404);

        req.student = student;  // const { _id } = req.student; getting studentId on controller file
        next();
    } catch (error) {
        next(error);
    }
}