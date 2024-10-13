import React, { useRef, useEffect } from 'react';
import videoSrc from '/assets/stuck.mp4'; 
import { motion } from 'framer-motion';

const AsylumVideo = ({ onVideoEnd }) => {
  const videoRef = useRef(null);

//this is to reduce video length to 5 seconds using setTimeout.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        onVideoEnd(); 
      }
    }, 6000); 

    // Clear the timer when the component unmounts.
    return () => clearTimeout(timer);
  }, [onVideoEnd]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent opacity-50"></div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative p-2 w-full max-w-5xl h-auto shadow-lg opacity-90"> 
        <div className="absolute inset-0 border-4 border-white rounded-lg box-border shadow-2xl"></div>
        <video
          ref={videoRef} // Set the ref to access the video element
          src={videoSrc}
          className="relative w-full h-full object-cover rounded-lg"
          controls={false}
          autoPlay
          muted
        />
      </motion.div>
    </div>
  );
};

export default AsylumVideo;
