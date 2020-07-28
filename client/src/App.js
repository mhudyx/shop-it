import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Navigation, Content, Footer } from './layouts'; 

function App() {
  return (
    <div className="app">
      <Router>
        <Navigation />
        <Content />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
