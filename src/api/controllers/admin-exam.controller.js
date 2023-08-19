import { Exam } from "../../models/exam.model.js"
import { CustomError } from "../../utils/customError.js";
import { examValidate } from "../../validations/exam.validation.js";

export async function getExams(req, res, next){
    try {
        const exams = await Exam.find();
        res.status(200).json({ message: 'Success', exams });
    } catch (error) {
        next(error);
    }
}

export async function getExam(req, res, next){
    try {
        const { examId } = req.params;
        const exam = await Exam.findById(examId);

        res.status(200).json({ message: 'Success', exam });
    } catch (error) {
        next(error);
    }
}

export async function getExamsByGroup(req, res, next){
    try {
        const { groupId } = req.params;
        const exams = await Exam.find({ groupId });
        res.status(200).json({ message: 'Success', exams });
    } catch (error) {
        next(error);
    }
}

export async function deleteExam(req, res, next){
    try {
        const { examId } = req.params;
        const deletedExam = await Exam.findByIdAndDelete(examId);

        res.status(200).json({ message: 'Success', deletedExam });
    } catch (error) {
        next(error);
    }
}

export async function createExam(req, res, next){
    try {
        const { title, description, duration, maxScore, passingScore } = req.body;
        const { groupId } = req.query;

        const isValid = examValidate({ title, description, duration, maxScore, passingScore, groupId });
        if(isValid) throw new CustomError(isValid, 400);

        const exam = await Exam.findOne({ title, description, groupId });
        if(exam) throw new CustomError(`${title} exam already exists`, 409);

        const newExam = await Exam.create({ title, description, duration, maxScore, passingScore, groupId });

        res.status(201).json({ message: 'Success', newExam });
    } catch (error) {
        next(error);
    }
}


// Working Propperly