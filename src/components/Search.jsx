"use client";
import React, { useState } from "react";

const Search = ({ onSubmit, searchText }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form className="flex gap-2 mx-auto justify-center" onSubmit={handleSubmit}>
      <input
        type="text"
        className=" w-full lg:w-[30rem] border-2 border-zinc-600 px-3 py-2 rounded-full"
        placeholder="Search"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
      />
      <button
        type="submit"
        className="bg-zinc-950 text-zinc-50 px-6 py-2 rounded-full"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
