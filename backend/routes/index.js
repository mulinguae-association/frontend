// routes/index.js

import express from 'express';
import teacherCardRoutes from './teacherCardRoutes.js';
import blogPostRoutes from "./blogPostRoutes.js"

const router = express.Router();

router.use('/', teacherCardRoutes);
router.use("/blogPosts", blogPostRoutes);

export default router;
