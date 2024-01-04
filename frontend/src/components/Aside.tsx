import axios from 'axios';
import { useState, useEffect } from 'react';
import { apiURL } from '../utils/axios';
import { Link } from 'react-router-dom';
import { User } from '../interfaces/user';


export const Aside = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUserList] = useState<User[]>([]);

  const loadPosts = async () => {
    axios.get(`${apiURL}/user/users`, { withCredentials: true, params: { limit: 5 } })
      .then((response) => {
        console.log('Loaded user list!');
        setUserList(response.data.data);
        setLoading(false)
      })
      .catch(() => {
        // setLoading(false)
      });
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="hidden shrink-0 flex-col z-50 inset-y-0 w-auto h-full lg:flex lg:w-80">
      <div className="flex flex-col grow p-4 bg-white overflow-y-auto gap-y-5">
        <aside className="flex flex-col flex-1 list-none">
          <section className="px-6 py-4 bg-gray-50 rounded-md">
            <h1 className="text-xl font-bold">Who to follow</h1>
            <ul role="list">
              {loading ? (
                <p>Loading...</p>
              ) : users ? (
                users.map((user: User) => (
                  <li key={user.username} className="flex justify-between gap-x-6 py-4">
                    <div className="flex min-w-0 gap-x-4">
                      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.avatar} alt="" />
                      <div className="min-w-0 flex-col">
                        <Link
                          to={'/profile/' + user.username}
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          {user.name}
                        </Link>
                        <p className="text-sm leading-6 text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>User not found</p>
              )}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  )
}
