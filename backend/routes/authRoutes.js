import express from "express";
import { getProfile, updateProfile, login, logout, register, forgotPasssword, ResetPassword } from "../controllers/authController.js";
import authenticateUser from "../middleware/authMiddlewar.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: storage });

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", getProfile);
// forgot password
router.post("/forgot-password", forgotPasssword)
router.post("/reset-password/:id/:token", ResetPassword)
// update user info 
router.put("/user/update", upload.single('profileImage'), authenticateUser, updateProfile)

export default router;
