'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="flex h-[90vh] w-full items-center justify-center bg-white text-gray-700">
            <motion.div
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <motion.div
                    className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-red-500"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <motion.p
                    className="text-sm text-gray-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                >
                    Loading, please wait...
                </motion.p>
            </motion.div>
        </div>
    );
}
