import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSecretToken } from "../utils/secretToken.js";
import { isAuthenticated } from "../middlewares/index.js";
import 'dotenv/config';

const router = express.Router();

/**
 * Get all users
 * 
 */
router.get('/all', isAuthenticated, async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({
      count: users.length,
      data: users
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


/**
 * Get user by id
 * 
 */
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);

    return response.status(200).json(sanitizeUserData(user));
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


/**
 * Update user by id
 * 
 */
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.username ||
      !request.body.password
    ) {
      return response.status(400).send({
        message: 'Send all required fields: username, password',
      })
    }

    const { id } = request.params;

    const result = await User.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


/**
 * Delete user by id
 * 
 */
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;