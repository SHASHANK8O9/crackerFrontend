'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export default function AboutUs() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-red-600 px-6 py-12">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-extrabold text-red-600 mb-6 text-center tracking-wide"
            >
                About Us
            </motion.h1>

            <div className="max-w-4xl text-center">
                <h2 className="text-2xl font-semibold text-red-600 mb-6">
                    <Typewriter
                        words={[
                            "Welcome to Namma Pettikadai!",
                            "Your trusted wholesale firecracker supplier.",
                            "Best quality fireworks at unbeatable prices."
                        ]}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={50}
                        deleteSpeed={30}
                        delaySpeed={1500}
                    />
                </h2>

                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    We specialize in providing high-quality firecrackers at the best wholesale prices.
                    At Namma Pettikadai, we ensure safety, authenticity, and affordability in every product.
                    Whether you're preparing for a grand celebration or stocking up for business, we have the best fireworks for you.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className=" shadow-lg p-6 rounded-2xl border border-red-600 w-72 text-center text-red-700"
                    >
                        <h3 className="text-2xl font-semibold">Our Vision</h3>
                        <p className="mt-3 text-md">
                            To be the most trusted wholesale firecracker supplier, ensuring safety and quality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className=" shadow-lg p-6 rounded-2xl border border-red-600 w-72 text-center text-red-700"
                    >
                        <h3 className="text-2xl font-semibold">Our Mission</h3>
                        <p className="mt-3 text-md">
                            To deliver premium fireworks with safety and affordability for all celebrations.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
