import jwt from "jsonwebtoken";
import 'dotenv/config';

const { ACCESS_TOKEN_SECRET } = process.env;

export const createSecretToken = (id) => {
  return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: 3 * 24 * 60 * 60, // 3 Days
  });
};