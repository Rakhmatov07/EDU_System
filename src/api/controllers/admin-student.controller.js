import { Student } from "../../models/student.model.js";
import { CustomError } from "../../utils/customError.js";

export async function getStudents(req, res, next){
    try {
        const students = await Student.find();

        res.status(200).json({ message: 'Success', students });
    } catch (error) {
        next(error);
    }
}

export async function getStudent(req, res, next){
    try {
        const { studentId } = req.params;
        if(!studentId) throw new CustomError('Bad request!', 400);

        const student = await Student.findById(studentId);
        res.status(200).json({ message: 'Success', student });
    } catch (error) {
        next(error);
    }
}

export async function getStudentsByStatus(req, res, next){
    try {
        const { isAllowed } = req.query;
        const students = await Student.find({ isAllowed });

        res.status(200).json({ message: 'Success', students });
    } catch (error) {
        next(error);
    }
}

export async function addStudentToGroup(req, res, next){
    try {
        const { groupId } = req.query;
        const { studentId } = req.params;

        const updStudent = await Student.findByIdAndUpdate(studentId, { $set: {
            isAllowed: true,
            groupId
        } }, { new: true });

        res.status(200).json({ message: 'Success', updStudent });
    } catch (error) {
        next(error);
    }
}

export async function deleteStudentFromGroup(req, res, next){
    try {
        const { studentId } = req.params;
        const deletedStudent = await Student.findByIdAndUpdate(studentId, { $set: { isAllowed: false } }, { new: true });
        
        res.status(200).json({ message: 'Success', deletedStudent });
    } catch (error) {
        next(error);
    }
}
