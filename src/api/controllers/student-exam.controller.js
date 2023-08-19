import { Exam } from "../../models/exam.model.js";

export async function getExams(req, res, next){
    try {
        const { groupId } = req.student;
        const exams = await Exam.find({ groupId });

        res.status(200).json({ message: 'Success', exams });
    } catch (error) {
        next(error);
    }
}

export async function getExam(req, res, next){
    try {
        const { groupId } = req.student;
        const { examId } = req.params;
        const exam = await Exam.findOne({ _id: examId, groupId });

        res.status(200).json({ message: 'Success', exam });
    } catch (error) {
        next(error);
    }
}