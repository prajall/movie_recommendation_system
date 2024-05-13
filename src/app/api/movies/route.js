import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  try {
    const { movieName } = body;
    console.log(movieName);
    if (!movieName) {
      console.log("No movie name to search");
      return new NextResponse("Movie name is required", { status: 400 });
    }
    const response = await axios.post("http://localhost:5000/recommend", {
      movieName: movieName,
    });
    console.log(typeof response.data);
    const recommendedMovies = response.data;
    return new NextResponse(recommendedMovies, { status: 200 });
  } catch (error) {
    console.error("Error fetching data", error);
    return new NextResponse("Error fetching data", { status: 500 });
  }
}
