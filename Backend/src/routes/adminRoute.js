import db from '../model/db.js';
import express from 'express';
import adminController from '../controllers/adminController.js';
const router = express.Router();
router.post('/login',adminController.adminLogin);
export default router;