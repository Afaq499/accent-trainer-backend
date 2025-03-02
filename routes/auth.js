import express from 'express';

import {
  ResendEmail,
  ResetPassword,
  SignIn,
  SignUp,
  VerifyEmail
} from '../controllers/auth/index.js';

import { authenticateAuthToken } from '../middlewares/auth.js';
import catchResponse from '../utils/catch-response.js';

const router = express.Router();

router.post('/resend-email', async (req, res) => {
  try {
    const {
      email,
      type
    } = req.body
    const { message } = await ResendEmail({ email, type });
    res.status(200).send({ message });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.post('/reset-password', authenticateAuthToken, async (req, res) => {
  try {
    const {
      _id: userId
    } = req.user;

    const {
      password
    } = req.body;

    const response = await ResetPassword({
      userId,
      password
    });

    const { message } = response;
    res.status(200).json({ message });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const response = await SignIn({
      email,
      password
    });
    const info = response;
    res.send(info);
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.post('/sign-up', async (req, res) => {
  try {
    const resp = await SignUp(req.body)
    res.send(resp);
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.get('/verify-email', authenticateAuthToken, async (req, res) => {
  try {
    const {
      _id: userId
    } = req.user;

    const { message } = await VerifyEmail({ userId })
    res.status(200).json({ message, success: true });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
})

export default router;
