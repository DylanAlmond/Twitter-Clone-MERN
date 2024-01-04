import axios, { AxiosResponse } from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../utils/axios";

import { User } from "../interfaces/user";

interface AuthContext {
  currentUser: User,
  Logout: () => void;
}


const initialUser: User = {
  _id: '',
  name: '',
  username: '',
  avatar: ''
};


const AuthContext = createContext<AuthContext>({
  currentUser: initialUser,
  Logout: () => { }
});


export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);
  const [currentUser, setCurrentUser] = useState<User>(initialUser);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate('/login');
      }

      axios.get(`${apiURL}/user`, { withCredentials: true })
        .then((response: AxiosResponse<User>) => {
          setCurrentUser(response.data);
        })
        .catch((error) => {
          console.log(error);
          Logout();
        });
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie('token', []);
    navigate('/login');
  };

  const authValues = {
    currentUser,
    Logout,
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};