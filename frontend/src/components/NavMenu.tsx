import { NavLink } from "react-router-dom";
import { HomeIcon, ChatBubbleOvalLeftIcon, UserIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../provider/AuthProvider";

const navigation = [
  { name: 'Home', to: '/', icon: <HomeIcon /> },
  { name: 'Posts', to: '/posts', icon: <ChatBubbleOvalLeftIcon /> },
  { name: 'Profile', to: '/profile/', icon: <UserIcon /> }
];

export const NavMenu = () => {
  const { currentUser, Logout } = useAuth();

  return (
    <div className="flex flex-col shrink-0 z-50 inset-y-0 w-auto h-full lg:w-64">
      <div className="flex flex-col grow p-4 bg-white gap-y-5">
        <div className="flex items-center flex-shrink-0 h-16">
          <img
            className="w-auto h-10 max-w-fill"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </div>

        <nav className="flex flex-col flex-1 list-none">
          <li>
            <ul className="mx-[-0.5rem]" role="list">
              {navigation.map((route) => (
                <NavLink
                  key={route.name}
                  to={route.name === 'Profile' ? route.to + currentUser.username : route.to}
                  className={({ isActive }) =>
                    `${isActive ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-500'} flex font-semibold leading-6 px-2 py-3 rounded-md gap-x-3 justify-center lg:justify-start`
                  }
                >
                  <div className="w-6 h-6">
                    {route.icon}
                  </div>
                  <span className='hidden lg:block'>{route.name}</span>
                </NavLink>
              ))}

              <a
                onClick={Logout}
                className="text-gray-700 hover:text-indigo-500 flex font-semibold cursor-pointer leading-6 px-2 py-3 rounded-md gap-x-3 justify-center lg:justify-start"
              >
                <div className="w-6 h-6">
                  <ArrowLeftStartOnRectangleIcon />
                </div>
                <span className='hidden lg:block'>Logout</span>
              </a>
            </ul>
          </li>
          <li></li>
          <li className="mt-auto mx-[-1.5rem]">
            <div className="flex items-center py-3 px-6 gap-x-4 justify-center lg:justify-start">
              <img
                className="bg-gray-100 sj rounded-full w-12"
                src={currentUser.avatar}
                alt=""
              />
              <div className="hidden min-w-0 flex-col lg:flex">
                <p className="text-sm font-semibold leading-6 text-gray-900">{currentUser.name}</p>
                <p className="text-sm leading-6 text-gray-500">@{currentUser.username}</p>
              </div>
            </div>
          </li>
        </nav>
      </div>
    </div>
  )
};
