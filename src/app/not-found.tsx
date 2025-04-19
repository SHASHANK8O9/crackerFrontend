"use client"
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500 text-white">
      <div className="text-center p-8 bg-black bg-opacity-60 rounded-lg shadow-lg max-w-lg">
        <div className="mb-6">
          {/* Fancy Graphic or Animation (can replace this with your own image or animation) */}
          <img
            src="https://via.placeholder.com/150x150.png?text=Cracker+Image" // Placeholder, replace with actual image
            alt="Cracker Image"
            className="mx-auto mb-4 rounded-full shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-xl mb-6">
          It seems like you are lost. Don’t worry, let’s get you back on track!
        </p>
        {/* Button to Redirect to Product Page */}
        <Link href="/products">
          <p className="inline-block px-6 py-3 bg-yellow-500 text-black text-xl font-semibold rounded-full hover:bg-yellow-400 transition duration-300">
            Let’s Buy Crackers!
          </p>
        </Link>
      </div>
    </div >
  );
}
