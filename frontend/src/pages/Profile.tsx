import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../utils/axios";
import { User } from "../interfaces/user";


export const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User>();

  let { user } = useParams();

  const fetchProfile = async () => {
    if (!user) {
      return;
    }

    axios.get(`${apiURL}/user/profile`, {
      withCredentials: true,
      params: {
        username: user
      }
    })
      .then((response) => {
        console.log('Loaded profile!');
        
        setCurrentUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {    
    fetchProfile();
  }, [user]);

  return (
    <div className="flex flex-col grow p-4 bg-white overflow-y-auto gap-y-8">
      {loading ? (
        <p>Loading...</p>
      ) : currentUser ? (
        <>
          <header className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="text-md font-semibold text-gray-500">@{currentUser.username}</p>
            <img
              className="bg-gray-100 sj rounded-full w-24"
              src={currentUser.avatar}
              alt=""
            />
          </header>

          <section className="flex flex-col gap-y-2">
            <h1 className="text-xl font-bold">Recent posts</h1>
            <div className="flex flex-col grow divide-y gap-y-2 divide-gray-200">
              {/* Your recent posts content */}
            </div>
          </section>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  )
}
