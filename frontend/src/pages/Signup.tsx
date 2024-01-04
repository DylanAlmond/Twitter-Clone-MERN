import axios from 'axios';
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { apiURL } from '../utils/axios';
import { resizeImage } from '../utils/resizeImage';


export const Signup = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [avatar, setAvatar] = useState<File>();

  const [error, setError] = useState<string>('');

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const avatarPreviewRef = useRef<HTMLImageElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (avatarPreviewRef.current && avatar) {
      avatarPreviewRef.current.src = URL.createObjectURL(avatar);
    }
  }, [avatar])

  const handleButtonClick = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || event.target.files.length === 0) {
      setError('File not found.');
      return;
    }

    const file = event.target.files[0];

    try {
      const resizedFile = await resizeImage(file);

      setAvatar(resizedFile);
    } catch (error) {
      setError('Image resizing failed');
    }
  }

  const handleSignup = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    axios.post(`${apiURL}/auth/register`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        // console.log(response);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setError(() => {
          switch (error.response.status) {
            case 401:
              return 'Invalid password.';
            case 404:
              return 'User not found.'
            default:
              return 'An error occurred.';
          }
        })
      });
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>

        <p className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-red-600">
          {error}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => { handleSignup(); e.preventDefault() }}>
          <div className="col-span-full">
            <div className="flex items-center justify-between">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
            </div>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full">
            <div className="flex items-center justify-between">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
            </div>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <img 
                ref={avatarPreviewRef} 
                src={`${apiURL}/uploads/defaultAvatar.jfif`}
                className="h-12 w-12 flex-none rounded-full bg-gray-50" 
                alt="" 
                />
              <input
                type="file"
                ref={avatarInputRef}
                className='hidden'
                accept="image/*"
                onChange={(e) => handleFileUpload(e)}
              />
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={handleButtonClick}
              >
                Change
              </button>
            </div>
          </div>

          <div className='className="col-span-full"'>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
