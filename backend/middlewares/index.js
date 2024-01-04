import { userModel } from '../models/user.js';
import jwt from "jsonwebtoken";
import 'dotenv/config';

const { ACCESS_TOKEN_SECRET } = process.env;

export const isAuthenticated = async (request, response, next) => {
  try {
    const token = request.cookies.token;

    if (!token) {
      return response.status(403).send();
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, async (error, data) => {
      if (error) {
        return response.status(401).send();
      } else {
        const user = await userModel.findById(data.id);

        if (!user) {
          return response.status(404).send();
        }

        request.authData = user;
        
        return next();
      }
    })

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const isOwner = async (request, response, next) => {
  const { authData } = request;
  const { id } = request.params;

  if (!authData || !id) {
    return response.status(400).send();
  }

  // Check user exists
  const user = await userModel.findById(authData._id);

  if (!user) {
    return response.status(404).send();
  }

  console.log(user.id, id);

  if (user._id !== id) {
    return response.status(401).send();
  }

  return next();
}
