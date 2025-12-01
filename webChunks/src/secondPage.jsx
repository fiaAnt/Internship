import React from 'react';
import './styles.css';

const SecondPage = () => {
  return (
    <div className="page second-page">
      <h1>Second Page</h1>
      <section>
        <div>
          <h2>Webpack Code Splitting Project</h2>
          <p>
            Configure a build for React project. Use code splitting for Webpack
            generate multiple snippets of load scripts for each page the user
            visits.
          </p>
          <div className="topics">
            <h3>Topics covered:</h3>
            <ul>
              <li>Starting a web server</li>
              <li>Loaders</li>
              <li>Code splitting</li>
              <li>Webpack plugins</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecondPage;
