import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { createExam, deleteExam, getExam, getExams, getExamsByGroup } from "../controllers/admin-exam.controller.js";
export const router = Router();


router.get('/admin/exam', isAdmin, getExams);
router.get('/admin/exam/group/:groupId', isAdmin, getExamsByGroup);
router.get('/admin/exam/:examId', isAdmin, getExam);

router.post('/admin/exam', isAdmin, createExam);

router.delete('/admin/exam/:examId', isAdmin, deleteExam);


// Working Propperly
