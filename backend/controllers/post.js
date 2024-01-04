import { postModel } from "../models/post.js";
import { userModel } from "../models/user.js";

export const addPost = async (request, response) => {
  try {
    const { content } = request.body;

    if ( !content ) {
      return response.status(400).send();
    }

    const { authData } = request;

    if (!authData) {
      return response.status(401).send();
    }

    const post = await postModel.create(
      {
        owner: authData._id,
        content: content,
      }
    );

    return response.status(200).send({ post });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};


export const getPosts = async (request, response) => {
  try {
    const { page = 1, limit = 5, owner, ascending = -1 } = request.query;

    const count = await postModel.countDocuments();
    const totalPages = Math.ceil(count / limit);

    if (page < 1 || page > totalPages) {
      return response.status(404).send();
    }

    let query = {};

    if (owner) {
      query.owner = owner;
    }    

    const posts = await postModel.find(query)
      .sort({ createdAt: parseInt(ascending) })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('owner')
      .exec();

    return response.status(200).json({
      currentPage: parseInt(page),
      totalPages: totalPages,
      count: parseInt(limit),
      data: posts
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  };
};


export const editPost = async (request, response) => {
  try {
    const { content } = request.body;

    if (!content) {
      return response.status(400).send();
    }

    const { id } = request.params;

    const updatedPost = {
      content: content,
    }

    const result = await postModel.findByIdAndUpdate(id, updatedPost, { new: true })
      .populate('owner');

    if (!result) {
      return response.status(404).send()
    }

    return response.status(200).json({ result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};


export const deletePost = async (request, response) => {
  try {
    const { id } = request.params;

    const result = await postModel.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send();
    }

    return response.status(200).send();
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};