import React from 'react';
import './app.css';
import ComingSoonGames from './pages/ComingSoonGames';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import GamePage from './pages/GamePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/coming-soon" element={<ComingSoonGames />} />
        <Route path="/profile-page" element={<Profile />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="*" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
