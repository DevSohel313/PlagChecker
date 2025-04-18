// src/components/ResultDisplay.js
import React from 'react';

function ResultDisplay({ result }) {
  return (
    <div>
      <h2>Results</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default ResultDisplay;
