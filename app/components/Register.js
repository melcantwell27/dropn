// components/Register.js

import { useState } from 'react';
import { registerUser } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: '',
    role: 'student', // Default role is set to student
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set the appropriate role field based on the selected role
      const userData = {
        username: formData.username,
        password1: formData.password1,
        password2: formData.password2,
        is_student: formData.role === 'student', // Set is_student to true if role is student
        is_teacher: formData.role === 'teacher', // Set is_teacher to true if role is teacher
      };
      const response = await registerUser(userData);
      console.log(response);
      // Redirect or show success message after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 mx-auto block">Register Below!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-bold">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3"
          />
        </label>
        <label className="block  font-bold">
          Password:
          <input
            type="password"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3"
          />
        </label>
        <label className="block font-bold">
          Confirm Password:
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3"
          />
        </label>
        <label className="block font-bold">
          Role:
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mx-auto block"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;