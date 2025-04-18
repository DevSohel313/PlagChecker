// src/pages/AiTextCheck.js
import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import ResultDisplay from '../components/ResultDisplay';


function AiTextCheck() {
  const [result, setResult] = useState(null);

  return (
    <div>
      <h2>AI Text Check</h2>
      <TextInput onResult={setResult} />
      {result && <ResultDisplay result={result} />}
    </div>
  );
}

export default AiTextCheck;
