import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { createGroup, deleteGroup, getGroup, getGroups } from "../controllers/admin-group.controller.js";
export const router = Router();


router.get('/admin/group', isAdmin, getGroups);
router.get('/admin/group/:groupId', isAdmin, getGroup);

router.post('/admin/group', isAdmin, createGroup);

router.delete('/admin/group/:groupId', isAdmin, deleteGroup);


// Working Propperly