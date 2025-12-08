import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Menu } from './components/Menu';
import {
  HomePage,
  BreakingNewsPage,
  WorldNewsPage,
  CompanyPage,
  TeamPage,
  ContactPage,
} from './components/Pages';
import { menuItems } from './menuItems';

function App() {
  return (
    <BrowserRouter>
      <Menu items={menuItems} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/breaking" element={<BreakingNewsPage />} />
        <Route path="/news/world" element={<WorldNewsPage />} />
        <Route path="/about/company" element={<CompanyPage />} />
        <Route path="/about/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
