import express from 'express';

import { isAuthenticated, isOwner } from "../middlewares/index.js";
import { addPost, getPosts, editPost, deletePost } from "../controllers/post.js";

export default (router) => {
  router.post('/posts', isAuthenticated, addPost);
  router.get('/posts', isAuthenticated, getPosts);
  router.put('/posts/:id', isAuthenticated, editPost);
  router.delete('/posts/:id', isAuthenticated, deletePost);
};