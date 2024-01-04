import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { Post } from "../interfaces/user";
import { apiURL } from "../utils/axios";
import { formatTimeDifference } from "../utils/formatTimeDifference";
import { Link } from "react-router-dom";
import { AddPost } from "../components/AddPost";

interface PostCardProps {
  post: Post
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState<boolean>(false);

  const toggleLiked = () => {
    setLiked(c => !c)
  };

  return (
    <div key={post.owner.username} className="flex flex-col justify-between gap-y-2 py-4">
      <div className="flex items-center min-w-0 gap-x-4">
        <img className="h-10 w-10 flex-none rounded-full bg-gray-50" src={post.owner.avatar} alt="" />
        <div className="flex flex-row items-center gap-x-2">
          <Link
            to={'/profile/' + post.owner.username}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {post.owner.name}
          </Link>
          <p className="text-sm leading-6 text-gray-500">@{post.owner.username}</p>
          <span className="text-sm leading-6 font-bold text-gray-500">·</span>
          <p className="text-sm leading-6 text-gray-500">{formatTimeDifference(new Date(post.updatedAt))}</p>
        </div>
      </div>

      <div className="mx-14">
        <p className="text-sm leading-6 text-gray-900">{post.content}</p>
      </div>

      <div className="flex gap-x-4 mx-14 mt-2 cursor-pointer">
        <div
          className={`${liked ? 'text-indigo-600' : 'hover:text-indigo-500'} w-6 h-6`}
          onClick={toggleLiked}
        >
          {liked ? <HeartIconSolid /> : <HeartIcon />}
        </div>
        <div className="w-6 h-6 hover:text-indigo-500">
          <ChatBubbleOvalLeftIcon />
        </div>
      </div>
    </div>
  )
};


export const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, SetPosts] = useState<Post[]>([]);
  const { currentUser } = useAuth();

  const fetchPosts = async () => {
    axios.get(`${apiURL}/posts`, { withCredentials: true, params: { limit: 5 } })
      .then((response) => {
        console.log('Loaded posts!');

        SetPosts(response.data.data);
        setLoading(false)
      })
      .catch(() => {
        // setLoading(false)
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col grow p-4 bg-white overflow-y-auto gap-y-8">
      <header className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold">Home</h1>
        <p className="text-md font-semibold text-gray-500">Hello, {currentUser.name}.</p>
        <AddPost />
      </header>

      <section className="flex flex-col gap-y-2">
        <h1 className="text-xl font-bold">Recent posts</h1>
        <div className="flex flex-col grow divide-y gap-y-2 divide-gray-200">
          {loading ? (
            <p>Loading...</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          )}
        </div>
      </section>
    </div>
  )
};
