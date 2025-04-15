import React from "react";

const SearchBar = ({ topic, setTopic, k, setK, onSearch }) => {
  return (
    <div className="p-4 flex gap-4 items-center">
      <input
        type="text"
        placeholder="Enter a research topic..."
        className="p-2 border rounded w-1/2"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="10"
        className="p-2 border rounded w-20"
        value={k}
        onChange={(e) => setK(e.target.value)}
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
