"use client";
// import Search from "@/components/Search";
import axios from "axios";
import { useState } from "react";
import ShowMovies from "../components/ShowMovies";

export default function Home() {
  const [input, setInput] = useState("");
  const [searchedInput, setSearchedInput] = useState("");
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movies = ["titanic", "moana"];
    if (input != "") {
      try {
        const response = await axios.post("/api/movies", {
          movieName: input,
        });
        const recommendedMovies = response.data.split(",");
        console.log(recommendedMovies);
        // console.log("Recommended movies final: ", response);
        setRecommendedMovies(recommendedMovies);
        setSearchedInput(input);
        setShowResults(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-3xl font-semibold">
        Movie Recommendation System using Python
      </h1>
      <p className="opacity-75 mt-2 max-w-[500px] mx-auto mb-8 text-center">
        Search for your favourite movie and get the recommended movie that suits
        your preferences
      </p>
      <div className="w-[700px] mt-6 flex mx-auto flex-col justify-center">
        <form
          className="flex gap-2 w-full mx-auto justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className=" w-full border-2 border-zinc-600 px-3 py-2 rounded-full"
            placeholder="Search"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button
            type="submit"
            className="bg-zinc-950 text-zinc-50 px-4 py-2 rounded-full"
          >
            Search
          </button>
        </form>

        {showResults && (
          <div>
            <h2 className="text-xl font-semibold  mt-6 mb-3 text-center">
              Recommended Movies for "{searchedInput}"
            </h2>
            {console.log(typeof recommendedMovies)}
            {recommendedMovies.map((movie) => {
              return <div className="border-b p-3 text-left">{movie}</div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
