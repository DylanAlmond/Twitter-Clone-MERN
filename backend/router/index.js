import express from 'express';

import auth from './auth.js';
import user from './user.js';
import post from './post.js';

const router = express.Router();

export default () => {
  auth(router)
  user(router)
  post(router)

  return router;
}