import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import { createSecretToken } from "../utils/secretToken.js";

export const login = async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).send();
    }

    const user = await userModel.findOne({ username }).select('+authentication.password');

    if (!user) {
      return response.status(404).send();
    }

    const auth = await bcrypt.compare(password, user.authentication.password);

    if (!auth) {
      return response.status(401).send();
    }

    const token = createSecretToken(user._id);
    response.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    return response.status(200).send({ user });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const register = async (request, response) => {
  try {
    const { name, username, password } = request.body;

    if (!name || !username || !password) {
      return response.status(400).send();
    }

    let avatar = 'http://localhost:5555/uploads/defaultAvatar.jfif';

    if (request.file) {
      avatar = 'http://localhost:5555/uploads/' + request.file.filename;
    }

    const user = await userModel.create(
      { 
        name: name,
        avatar: avatar,
        username: username.toLowerCase().replaceAll(/\s/g,''), 
        authentication: {
          password: password
        } 
      }
    );

    const token = createSecretToken(user._id);

    response.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    return response.status(201).send({ user });
  } catch (error) {
    console.log(error.message);

    if (error.code === 11000) {
      return response.status(409).send();
    }

    response.status(500).send({ message: error.message });
  }
};