import express from 'express';

import auth from './auth.js';
import user from './users.js';
import progress from './progress.js';

import { authenticateAuthToken } from '../middlewares/auth.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/progress', authenticateAuthToken, progress);
router.use('/users', authenticateAuthToken, user);

export default router;
