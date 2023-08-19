import { v4 as uuid } from "uuid";
import path from "path";
import { Exam } from "../../models/exam.model.js";
import { Project } from "../../models/project.model.js";
import { CustomError } from "../../utils/customError.js";
import { projectValidate } from "../../validations/project.validation.js";
 
export async function getProjects(req, res, next){
    try {
        const { _id } = req.student;
        const projects = await Project.find({ studentId: _id });

        res.status(200).json({ message: 'Success', projects });
    } catch (error) {
        next(error);
    }
}

export async function getProject(req, res, next){
    try {
        const { projectId } = req.params;
        const { _id } = req.student;

        const project = await Project.findOne({ _id: projectId, studentId: _id });
        res.status(200).json({ message: 'Success', project });
    } catch (error) {
        next(error);
    }
}

export async function sendProject(req, res, next){
    try {
        const { projectName, studentComment, groupId } = req.body;
        const { examId } = req.params;
        const { file } = req.files;
        const { _id } = req.student;
        
        if(!file) throw new CustomError('File Not Found', 400);

        const isValid = projectValidate({ projectName, groupId, examId });
        if(isValid) throw new CustomError(isValid, 400);
        
        const exam = await Exam.findById(examId);
        const endTime = new Date(exam.createdAt).setHours(new Date(exam.createdAt).getHours() + Number(exam.duration));

        if(new Date(endTime) < new Date()) throw new CustomError('Deadline end', 409);

        const project = await Project.findOne({ examId, studentId: _id });
        if(project?.attempts == 0) throw new CustomError('You do not have attempts', 409);

        if(!project){
            const fileName = `${uuid()}${path.extname(file.name)}`;
            const newProject = new Project({ projectName, fileName, studentComment, groupId, examId, studentId: _id });
            newProject.attempts -= 1;
            await newProject.save();
            file.mv(process.cwd() + '/src/public/uploads/' + fileName);

            res.status(201).json({ message: 'Success', newProject });
        }else{
            const fileName = `${uuid()}${path.extname(file.name)}`;
            project.projectName = projectName ?? project.projectName;
            project.studentComment = studentComment ?? project.studentComment;
            project.groupId = groupId ?? project.groupId;
            project.attempts -= 1; 
            
            file.mv(process.cwd() + '/src/public/uploads/' + fileName);

            await project.save();
            res.status(201).json({ message: 'Success', project });
        }

    } catch (error) {
        next(error);
    }
}