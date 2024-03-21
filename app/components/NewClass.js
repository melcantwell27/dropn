// components/NewClass.js

import { useState } from 'react';
import { createNewClass } from '../utils/api'; // Assuming you have a createClass function in your utils/api.js file

const NewClass = () => {
  const [formData, setFormData] = useState({
    className: '',
    datetime: '',
    studio: '',
    teacher: '',
    genre: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format datetime string to match Django model format
      const formattedDateTime = new Date(formData.datetime).toISOString();
      const response = await createNewClass({ ...formData, datetime: formattedDateTime });
      if (response.ok) {
        alert(`Thanks ${formData.teacher}! ${formData.className} has been added to the roster! Sweet moves!`);
      } else {
        setError('Oops, the new class didn\'t send. Try again?');
      }
    } catch (error) {
      console.error('Error creating class:', error);
      setError('Oops, the new class didn\'t send. Try again?');
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 mx-auto block">Create a New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-bold">
          Class Name:
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3"
          />
        </label>
        <label className="block font-bold">
          Date and Time:
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3"
          />
        </label>
        <label className="block font-bold">
          Studio:
          <input
            type="text"
            name="studio"
            placeholder="optional"
            value={formData.studio}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3"
          />
        </label>
        <label className="block font-bold">
          Genre:
          <input
            type="text"
            name="genre"
            placeholder="optional"
            value={formData.genre}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3"
          />
        </label>
        {error && <p className="text-red-500 font-bold">{error}</p>}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mx-auto block"
        >
          Create Class
        </button>
      </form>
    </div>
  );
};

export default NewClass;
