import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { login, logout } from "../controllers/admin.controller.js";
export const router = Router();


router.post('/admin/login', login);
router.delete('/admin/logout', isAdmin, logout);


// Working Propperly