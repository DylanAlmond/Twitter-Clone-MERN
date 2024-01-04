import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { apiURL } from "../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddPost = () => {
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();

  const createPost = async () => {
    const data = {
      content: content
    }

    try {
      const response = await axios.post(`${apiURL}/posts`, data, { withCredentials: true });

      console.log(response);

      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mx-auto my-2">
      <form onSubmit={(e) => { createPost(); e.preventDefault() }}>
        <div className="flex flex-col px-4 py-3.5 gap-1 mb-4 relative appearance-none border rounded-lg w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <label htmlFor="content" className="w-0 h-0">
            Write your post:
          </label>
          <textarea
            id="content"
            name="content"
            className="border-0 resize-none w-full p-0"
            rows={4}
            placeholder="Enter your post content here..."
            required={true}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-6 h-6 hover:text-indigo-500">
              <PaperAirplaneIcon />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};
