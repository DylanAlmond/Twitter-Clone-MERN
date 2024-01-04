import { userModel } from "../models/user.js";

export const getCurrentUser = async (request, response) => {
  try {
    const { authData } = request;

    if (!authData) {
      return response.status(401).send();
    }

    return response.status(200).send(authData);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};


export const getAll = async (request, response) => {
  try {
    const { page = 1, limit = 5 } = request.query;

    const count = await userModel.countDocuments();
    const totalPages = Math.ceil(count / limit);

    if (page < 1 || page > totalPages) {
      return response.status(404).send();
    }

    const users = await userModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    return response.status(200).json({
      currentPage: parseInt(page),
      totalPages: totalPages,
      count: parseInt(limit),
      data: users
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  };
};


export const getByUsername = async (request, response) => {
  try {
    const { username } = request.query;

    if (!username) {
      return response.status(400).send();
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return response.status(404).send();
    }

    return response.status(200).send({ user });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
}