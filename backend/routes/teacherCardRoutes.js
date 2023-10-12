import express from 'express';
import multer from 'multer';
import {
  getTeachersCard,
  createTeacherCard,
  deleteTeacherCard,
  updateTeacherCard
} from '../controllers/teacherCardController.js';
import { v4 as uuidv4 } from 'uuid';
import authenticateUser from '../middleware/authMiddlewar.js';

const router = express.Router();

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: storage });

// API routes
router.post('/teachersCard', upload.single('image'), authenticateUser, createTeacherCard);
router.delete('/deleteTeacherCard/:id', authenticateUser, deleteTeacherCard);
router.patch('/updateTeacher/:id', authenticateUser, upload.single('image'), updateTeacherCard);
router.get('/teachers', getTeachersCard);

export default router;
