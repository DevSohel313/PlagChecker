// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li style={{color:"black", textAlign:'center'}}><Link to="/">Home</Link></li>
        <li><Link to="/plagiarism-check">Plagiarism Check</Link></li>
        <li><Link to="/ai-text-check">AI Text Check</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
