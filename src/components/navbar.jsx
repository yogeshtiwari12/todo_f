import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './context';
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/userroute21/logout', {}, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success('Logout Successful!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error('Logout failed, please try again.');
    }
  };

  return (
    <div className="relative w-full shadow-lg bg-blue-50">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="text-md font-bold text-blue-900 text-2xl">
          <h3>
            Task<span className="text-2xl text-blue-600">Box</span>
          </h3>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            <li>
              <Link
                to="/"
                className="text-sm font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/addtodo"
                className="text-sm font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-300 ease-in-out"
              >
                Addtodo
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex space-x-4">
          {profile?.role === 'admin' && (
            <Link
              to="/dashboard"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-colors duration-300"
            >
              Dashboard
            </Link>
          )}
          {profile ? (
            <button
              onClick={logout}
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-400 transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 cursor-pointer text-blue-800"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 bg-blue-50">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-sm font-semibold text-blue-800 transition-colors duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>
            <li>
            <Link
                to="/addtodo"
                className="text-sm font-semibold text-blue-800 transition-colors duration-300 ease-in-out"
              >
                Addtodo
              </Link>
            </li>
          </ul>
          <div className="flex justify-between mt-4">
            {profile?.role === 'admin' && (
              <Link
                to="/dashboard"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-colors duration-300"
              >
                Dashboard
              </Link>
            )}
            {profile ? (
              <button
                onClick={logout}
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-400 transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;