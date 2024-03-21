// Login.js

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { loginUser } from '../slices/authSlice'; // Import loginUser action creator from your authSlice

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Use useRouter to access the router object

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the loginUser action with the form data
      await dispatch(loginUser(formData));
      router.push('/'); // Redirect to root after successful login
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., display error message)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h2 className="text-3xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
