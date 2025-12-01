import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const SecondPage = lazy(() => import('./secondPage'));

const HomePage = () => (
  <div className="page">
    <h1>Home Page</h1>
    <p>Click "Second Page"</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/secondPage" className="nav-link">
            Second Page
          </Link>
        </nav>

        <main>
          <Suspense>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/secondPage" element={<SecondPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
