import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
    onSearch(query);
    console.log(query);
  };

  return (
    <form onSubmit={handleSubmit} className="my-2 flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="p-2 border rounded w-full bg-gray-300"
      />
      <button type="submit" className="bg-blue-500 text-white text-xl hover:bg-gray-200 hover:text-blue-500 px-4 py-2 rounded ml-2 w-[200px] border-2">
        Search
      </button>
      
    </form>
  );
};

export default SearchBar;