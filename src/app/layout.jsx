import { Inter, Poppins } from "next/font/google";
import { BiSolidMoviePlay } from "react-icons/bi";

import "./globals.css";

const font = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Movie Recommendation System",
  description: "Get Movie suggestions based on your preferences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="h-screen w-11/12 mx-auto ">
          <div className="py-6 ">
            <h1 className="text-3xl font-bold flex justify-cente">
              <BiSolidMoviePlay />
              PykFlix
            </h1>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
