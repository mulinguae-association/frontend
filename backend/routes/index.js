// routes/index.js

import express from 'express';
import teacherCardRoutes from './teacherCardRoutes.js';

const router = express.Router();

router.use('/', teacherCardRoutes);

export default router;
