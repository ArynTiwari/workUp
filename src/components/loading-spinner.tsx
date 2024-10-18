import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
            <div className="flex flex-col items-center">
                {/* Loader */}
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 dark:border-gray-600 dark:border-t-white h-32 w-32 mb-4"></div>
                {/* Loading Text */}
                <h2 className="text-2xl font-semibold text-white dark:text-gray-300">Loading...</h2>
                <p className="text-gray-200 dark:text-gray-400">Please wait while we load the content.</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
