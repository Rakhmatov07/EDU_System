import { router as admin } from "./admin.route.js";
import { router as adminStudent } from "./admin-student.route.js";
import { router as adminExam } from "./admin-exam.route.js";
import { router as adminGroup } from "./admin-group.route.js";
import { router as adminProject } from "./admin-project.route.js";
import { router as student } from "./student.route.js";
import { router as studentExam } from "./student-exam.route.js";
import { router as studentProject } from "./student-project.route.js";


export default [ admin, adminStudent, adminExam, adminGroup, adminProject, student, studentExam, studentProject ];