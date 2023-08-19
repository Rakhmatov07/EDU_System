import { Router } from "express";
import { isStudent } from "../middlewares/isStudent.js";
import { getProject, getProjects, sendProject } from "../controllers/student-project.controller.js";
export const router = Router();


router.get('/student/project', isStudent, getProjects);
router.get('/student/project/:projectId', isStudent, getProject);

router.post('/student/project/:examId', isStudent, sendProject);