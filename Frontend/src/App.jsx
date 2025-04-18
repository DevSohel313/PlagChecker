import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import PlagiarismCheck from './Pages/PlagiarismCheck';
import AiTextCheck from './Pages/AiTextCheck';
import Results from './components/Results';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plagiarism-check" element={<PlagiarismCheck />} />
        <Route path="/ai-text-check" element={<AiTextCheck />} />
        <Route path="/results" element={<Results />} /> {/* Added route for Results */}
      </Routes>
    </Router>
  );
}

export default App;
