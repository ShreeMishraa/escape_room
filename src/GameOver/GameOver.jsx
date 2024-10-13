import React from 'react';
import { motion } from 'framer-motion';

function GameOver() {
    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="h-screen w-full bg-yellow-200 flex flex-col items-center justify-center p-6">
            <motion.div 
            initial={{ x: "100%",opacity: 0 }}
            animate={{ x: "0",opacity: 1 }}
            exit={{ x: "-100%",opacity: 0 }}
            transition={{ duration: 1 }}
            className="max-w-lg bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center">
                <img 
                    src="../src/assets/outro.jpeg" 
                    alt="" 
                    className="w-40 h-40 rounded-full mb-6 border-4 border-yellow-300 shadow-lg" 
                />
                
                <h1 className="text-4xl font-extrabold text-yellow-300 mb-4 text-center">
                    Thanks for Playing!
                </h1>
                
                <p className="text-white text-lg text-center mb-6">
                    After enduring those silly cards and solving cryptic puzzles, you finally 
                    found the key. You have helped Emily find peace and escape the asylum. Super proud of you! :) Now that you've come this far, let's connect!
                </p>
                
                <div className="flex justify-center space-x-4">
                    <button  
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                        onClick={() => openLink('https://www.linkedin.com/in/shree-mishra-aa2351288')}
                    >
                        LinkedIn
                    </button>
                    <button 
                        className="bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                        onClick={() => openLink('https://github.com/shree-mishra')}
                    >
                        GitHub
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default GameOver;
