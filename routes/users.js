import express from 'express';

import {
  GetUser,
  GetUsers,
  updateUser
} from '../controllers/user/index.js';

import catchResponse from '../utils/catch-response.js';
import { authenticateAuthToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/user-info/:userId', async (req, res) => {

  try {
    const { userId } = req.params;

    const userInfo = await GetUsers({ userId });
    res.json(userInfo);
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }

});

router.get('/', async (req, res) => {
  try {
    const {
      _id: userId
    } = req.user;
    const {
      user,
      spApiStoreStatus,
      adStoreStatus,
      profileId
    } = await GetUser({ userId });

    res.status(200).json({ 
      user,
      spApiStoreStatus,
      adStoreStatus,
      profileId
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.put('/', authenticateAuthToken, async (req, res) => {
  try {
    const {
      user: { _id: userId },
      body: { name }
    } = req;

    const resp = await updateUser({ userId, name });

    res.send(resp);
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

export default router;
