import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getProject, getProjects, getProjectsByExam, getProjectsByGroup, getProjectsByStudent, markStudentProject } from "../controllers/admin-project.controller.js";
export const router = Router();

router.get('/admin/project', isAdmin, getProjects); 
router.get('/admin/project/exam/:examId', isAdmin, getProjectsByExam); 
router.get('/admin/project/group/:groupId', isAdmin, getProjectsByGroup); 
router.get('/admin/project/student/:studentId', isAdmin, getProjectsByStudent); 
router.get('/admin/project/:projectId', isAdmin, getProject); 

router.put('/admin/project/:projectId', isAdmin, markStudentProject); // mark students and change isPassed status according to the score


// Working Propperly
