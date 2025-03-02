import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';

import { LocalLoginStrategy, AuthenticationStrategy } from './auth.js';

const ApplyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.json());
  app.use(logger('common'));
  app.use(passport.initialize());
  passport.use(LocalLoginStrategy);
  passport.use(AuthenticationStrategy);
};

export default ApplyMiddlewares;
