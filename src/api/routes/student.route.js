import { Router } from "express";
import { isStudent } from "../middlewares/isStudent.js";
import { login, logout, register, verify } from "../controllers/student.controller.js";
export const router = Router();


router.post('/student/register', register);
router.post('/student/login', login);
router.post('/student/verify', verify);
router.delete('/student/logout', isStudent, logout);


// Working Propperly