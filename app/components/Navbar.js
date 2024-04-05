// compnents/Navbar.js
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch hooks
import { logoutUser } from '../redux/slices/authSlice'


const Navbar = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const isLoggedIn = useSelector(state => state.auth.value.isAuth); // Updated to access isAuth from auth.value
  const username = useSelector(state => state.auth.value.username); // Updated to access username from auth.value

  const handleLogout = async () => {
    dispatch(logoutUser());
    // Handle logout logic if needed
  };

  return (
    <nav className="bg-lime-500 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-5xl font-bold text-blue-500">💧Drop'N💧</span>
              </Link>
            </div>
            <div className="hidden md:block ml-6">
              <div className="flex items-center space-x-4">
                <Link href="/my-spot">
                  <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-colors duration-300">
                    My Spot
                  </span>
                </Link>
                <Link href="/about">
                  <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-colors duration-300">
                    About
                  </span>
                </Link>
                <Link href="/">
                  <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-colors duration-300">
                    All Classes
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isLoggedIn ? (
                <>
                  <span className="mr-4 text-black">{`Welcome, ${username}`}</span> {/* Display welcome message with username */}
                  <button onClick={handleLogout} className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-colors duration-300">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-colors duration-300">Login</span>
                  </Link>
                  <Link href="/register">
                    <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium transition-colors duration-300">Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;