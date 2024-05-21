import React from "react";

interface SearchBarProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ handleChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search for a course"
      className="w-full placeholder:text-center text-center py-2 bg-gray-300 rounded-full outline-none placeholder:text-gray-700"
      onChange={handleChange}
    />
  );
};

export default SearchBar;
