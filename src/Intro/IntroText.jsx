import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '/assets/background.jpg';


const IntroText = ({ onIntroEnd }) => {
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    "Welcome to 'The Forgotten Asylum,' a place where time stands still and secrets lie dormant in the shadows.",
    "Decades ago, a girl named Emily was admitted to this asylum, but she was never seen again.",
    "Many believe that her spirit still haunts the halls of this abandoned building.",
    "Your mission is to find Emily's spirit and help her find peace by unlocking the mysteries of the asylum."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < lines.length - 1) {
        setCurrentLine((prevLine) => prevLine + 1);
      } else {
        onIntroEnd();
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [currentLine, lines.length, onIntroEnd]);

  return (
    <div className='w-full h-screen flex items-center justify-center'
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className=" bg-zinc-800 flex items-center justify-center">
        <div className="border-2 border-white py-1.5">
          <motion.div
            initial={{ y: "100%",opacity: 0 }}
            animate={{ y: "0",opacity: 1 }}
            exit={{ y: "-100%",opacity: 0 }}
            transition={{ duration: 1 }}
            className="bg-black bg-opacity-60 p-8 rounded-md max-w-xl text-white text-center"
          >
            <h1 className="text-white text-4xl font-extrabold py-1.5"> The Forgotten Asylum </h1>
            <p className="text-lg">{lines[currentLine]}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IntroText;
