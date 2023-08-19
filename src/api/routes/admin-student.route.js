import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { addStudentToGroup, deleteStudentFromGroup, getStudent, getStudents, getStudentsByStatus } from "../controllers/admin-student.controller.js";
export const router = Router();

router.get('/admin/student', isAdmin, getStudents);
router.get('/admin/student/status', isAdmin, getStudentsByStatus);
router.get('/admin/student/:studentId', isAdmin, getStudent);

router.put('/admin/student/:studentId', isAdmin, addStudentToGroup); // get student's info when they registered and add to the group

router.delete('/admin/student/:studentId', isAdmin, deleteStudentFromGroup);


// Working Propperly