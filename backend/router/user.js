import express from 'express';

import { isAuthenticated } from "../middlewares/index.js";
import { getCurrentUser, getAll, getByUsername } from "../controllers/user.js";

export default (router) => {
  router.get('/user', isAuthenticated, getCurrentUser);
  router.get('/user/users', isAuthenticated, getAll);
  router.get('/user/profile', isAuthenticated, getByUsername);
};