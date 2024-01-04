import express from 'express';

import { login, register } from "../controllers/auth.js";
import { upload } from '../middlewares/upload.js';

export default (router) => {
  router.post('/auth/register', upload.single('avatar'), register);
  router.post('/auth/login', login);
};