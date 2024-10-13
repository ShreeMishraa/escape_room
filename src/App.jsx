import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroText from './Intro/IntroText';
import AsylumVideo from './AsylumVideo/AsylumVideo';
import Password from './Password/Password';
import Level1 from './Level1/Level1';
import Level2 from './Level2/Level2';
import GameOver from './GameOver/GameOver';

function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const location = useLocation(); // Ye app fn ke andr hona chahiye

  const handleIntroEnd = () => {
    setIntroCompleted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {/* AnimatePresence will track route changes using location */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage introCompleted={introCompleted} onIntroEnd={handleIntroEnd} />} />
        <Route path="/Password" element={<Password />} />
        <Route path='/Level1' element={<Level1 />}></Route>
        <Route path='/Level2' element={<Level2 />}></Route>
        <Route path='/GameOver' element={<GameOver />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

const HomePage = ({ introCompleted, onIntroEnd }) => {
  const navigate = useNavigate(); 

  const handleVideoEnd = () => {
    navigate('/Password'); 
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!introCompleted ? (
        <IntroText onIntroEnd={onIntroEnd} />
      ) : (
        <AsylumVideo onVideoEnd={handleVideoEnd} />
      )}
    </div>
  );
};

export default App;





