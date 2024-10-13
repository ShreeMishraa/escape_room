import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg.avif';
import { motion } from 'framer-motion';

const Password = () => {
  const date = new Date().toLocaleDateString();
  const [currentDate, setCurrentDate] = useState(date);
  const navigate = useNavigate();

  useEffect(() => {
    const updateDate = () => {
      const newDate = new Date().toLocaleDateString();
      setCurrentDate(newDate);
    };
    const intervalId = setInterval(updateDate, 86400000);
    return () => clearInterval(intervalId);
  }, []);

  const showBeginButton = () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput.value === currentDate) {
      document.querySelector('button').style.display = 'block';
    } else {
      document.querySelector('button').style.display = 'none';
    }
  };

  const handleButtonClick = () => {
    navigate('/Level1');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-red-950 bg-opacity-85 p-8 w-full max-w-md rounded-lg shadow-lg">
        <div className="flex flex-col items-center w-full mb-2">
          <div className="w-full mb-4">
            <img src="../src/assets/password.jpg" alt="Password illustration" className="w-full rounded-md opacity-90" />
          </div>
          <div className="w-full mb-4">
            <div className="flex items-center mb-4">
              <div className="text-white bg-red-900 px-4 text-center py-3 mr-5 rounded-lg opacity-85">
                <h1>{currentDate}</h1>
              </div>
              <div className="flex-1">
                <label htmlFor="password" className="text-gray-400 text-sm mb-0 block"></label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-0 py-2.5 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50 text-center"
                  placeholder="Write what you see to begin!"
                  onChange={showBeginButton}
                />
              </div>
            </div>
          </div>
        </div>
        <motion.button 
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full bg-red-900 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition duration-300"
          style={{ display: 'none' }}
          onClick={handleButtonClick}
        >
          Let's Begin!
        </motion.button>
      </div>
    </div>
  );
};

export default Password;
