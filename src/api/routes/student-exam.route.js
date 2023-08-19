import { Router } from "express";
import { isStudent } from "../middlewares/isStudent.js";
import { getExam, getExams } from "../controllers/student-exam.controller.js";
export const router = Router();


router.get('/student/exam', isStudent, getExams);
router.get('/student/exam/:examId', isStudent, getExam);


// Working Propperly