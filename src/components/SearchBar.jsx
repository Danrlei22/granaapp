import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(term);
  };

  const clearSearch = () => {
    setTerm("");
    onSearch("");
  };

  return (
    <div className="flex flex-row p-4 bg-green-600 gap-2 w-auto m-4 rounded-lg shadow-lg max-w-2xl text-black">
      <input
        name="search"
        type="text"
        value={term}
        onChange={handleInputChange}
        placeholder="Search by amount or category"
        className="p-2 border rounded w-full"
      />
      {term && (
        <button
          onClick={clearSearch}
          className="bg-red-600 text-white p-2 rounded w-auto flex items-center gap-2 active:bg-red-800"
        >
          <IoClose /> Clean
        </button>
      )}
      <button
        onClick={handleSearchClick}
        className="bg-blue-600 text-white p-2 rounded w-auto flex items-center gap-2 active:bg-blue-800"
      >
        <FaMagnifyingGlass /> Search
      </button>
    </div>
  );
}

export default SearchBar;
