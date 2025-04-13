"use client";

import Link from "next/link";

export default function GlobalError() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            <div className="text-center p-8 bg-black bg-opacity-60 rounded-lg shadow-lg max-w-lg">
                <div className="mb-6">
                    <img
                        src="https://via.placeholder.com/150x150.png?text=Error" // Replace with any cool graphic
                        alt="Error Graphic"
                        className="mx-auto mb-4 rounded-full shadow-lg"
                    />
                </div>
                <h1 className="text-4xl font-bold mb-4">Something Went Wrong</h1>
                <p className="text-lg mb-6">
                    Don’t worry! These things happen. You can go back and try again.
                </p>
                <Link href="/">
                    <span className="inline-block px-6 py-3 bg-white text-black text-xl font-semibold rounded-full hover:bg-gray-200 transition duration-300">
                        Go Home
                    </span>
                </Link>
            </div>
        </div>
    );
}
