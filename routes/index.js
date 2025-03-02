import express from 'express';

import auth from './auth.js';
import user from './users.js';

import { authenticateAuthToken } from '../middlewares/auth.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', authenticateAuthToken, user);

export default router;
