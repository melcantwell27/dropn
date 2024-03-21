// components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = () => {
    handleSearch(selectedDate);
  };

  return (
    <div className="mb-4">
      <label htmlFor="search" className="block text-lg font-semibold mb-2">Search by Date:</label>
      <input
        type="date"
        id="search"
        className="border border-gray-300 rounded-md py-2 px-4 mr-2"
        onChange={handleChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit Date
      </button>
    </div>
  );
}

export default SearchBar;
