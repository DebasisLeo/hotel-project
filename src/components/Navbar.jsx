import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaHome, FaBookOpen, FaRocket } from 'react-icons/fa';
import logo from '../assets/logo.png';
import l1 from '../assets/l1.png';
import { AuthContext } from './AuthProvider';
import { Helmet } from 'react-helmet';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // Handle post sign-out actions if needed
      })
      .catch((error) => {
        console.error('Sign out failed:', error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary text-lg lg:text-xl flex items-center gap-2 px-4 py-2">
          <FaHome />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/rooms" className="hover:text-primary text-lg lg:text-xl flex items-center gap-2 px-4 py-2">
          <FaRocket />
          Rooms
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-booking" className="hover:text-primary text-lg lg:text-xl flex items-center gap-2 px-4 py-2">
          <FaBookOpen />
          My Bookings
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg sticky top-0 z-50">
      {/* Helmet for dynamic title and meta data */}
      <Helmet>
        <title>{user ? `${user.displayName}'s Dashboard` : 'My LuxStay Hotel'}</title>
        <meta name="description" content={user ? `${user.displayName}'s personal dashboard` : 'Book the best rooms at My LuxStay Hotel.'} />
      </Helmet>

      {user && (
        <div className="flex justify-center items-center bg-gradient-to-r from-gray-800 to-gray-700 text-white py-3">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-center">
            WELCOME, <span className="text-yellow-300">{user.displayName}</span>! 🎉
          </h2>
        </div>
      )}

      <div className="navbar bg-base-100 w-full px-6 lg:px-10 py-3 rounded-lg shadow-md mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] w-56 bg-base-100 rounded-lg shadow">
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center space-x-3">
            <img className="w-12 h-12 rounded-full" src={l1} alt="Logo" />
            <span className="text-lg lg:text-xl font-bold text-white">Brand</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-2 space-x-6">
            {links}
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center space-x-4">
              <img
                className="w-12 h-12 rounded-full border-2 border-primary shadow-md hover:scale-105 transform transition-all"
                src={user.photoURL}
                alt={user.displayName}
              />
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-primary text-lg lg:text-xl flex items-center gap-2 hover:scale-105 transform transition-all px-4 py-2">
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary text-lg lg:text-xl flex items-center gap-2 hover:scale-105 transform transition-all px-4 py-2">
              <FaUser />
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
