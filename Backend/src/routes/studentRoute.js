import db from '../model/db.js';
import express from 'express';
import authMiddle from '../middleware/authmiddleware.js';
import studentController from '../controllers/studentController.js';
const router = express.Router();
router.get('/students' ,studentController.getAllUsers);
router.get('/students/attendance' ,studentController.getAllStudentAttendance);
router.post('/students/add' ,studentController.createStudent);
router.post('/students/login',studentController.studentLogin);
router.post('/students/attendance',studentController.createStudentAttendance);
router.put('/students/update' ,studentController.updateStudent);
export default router;
