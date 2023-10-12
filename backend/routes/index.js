// routes/index.js

import express from 'express';
import teacherCardRoutes from './teacherCardRoutes.js';
import blogPostRoutes from "./blogPostRoutes.js"
import blogsComments from "./commentsRouter.js"
import authRoute from './authRoutes.js'
const router = express.Router();

router.use('/', teacherCardRoutes);
router.use("/blogPosts", blogPostRoutes);
router.use("/comments", blogsComments);
router.use("/auth", authRoute);


export default router;
