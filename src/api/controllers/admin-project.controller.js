import { Exam } from "../../models/exam.model.js";
import { Project } from "../../models/project.model.js";

export async function getProjects(req, res, next){
    try {
        console.log(12);
        const projects = await Project.find();
        res.status(200).json({ message: 'Success', projects });
    } catch (error) {
        next(error);
    }
}

export async function getProjectsByExam(req, res, next){
    try {
        const { examId } = req.params;
        const projects = await Project.find({ examId });
        res.status(200).json({ message: 'Success',  projects });
    } catch (error) {
        next(error);
    }
}

export async function getProjectsByGroup(req, res, next){
    try {
        const { groupId } = req.params;
        const projects = await Project.find({ groupId });
        res.status(200).json({ message: 'Success',  projects });
    } catch (error) {
        next(error);
    }
}

export async function getProjectsByStudent(req, res, next){
    try {
        const { studentId } = req.params;
        const projects = await Project.find({ studentId });
        res.status(200).json({ message: 'Success',  projects });
    } catch (error) {
        next(error);
    }
}

export async function getProject(req, res, next){
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        res.status(200).json({ message: 'Success',  project });
    } catch (error) {
        next(error);
    }
}

export async function markStudentProject(req, res, next){
    try {
        const { projectId } = req.params;
        const { score, teacherComment } = req.body;

        const project = await Project.findById(projectId);
        const exam = await Exam.findById(project?.examId);

        if(exam.passingScore < score){
            project.isPassed = true;
        } else {
            project.isPassed = false;
        }

        project.score = score;
        project.teacherComment = teacherComment;
        
        await project.save();

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
}