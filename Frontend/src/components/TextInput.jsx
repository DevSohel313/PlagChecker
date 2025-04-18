import React, { useState } from 'react';
import axios from 'axios';

function TextInput({ onResult }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (text.trim() === '') {
      setError('Text cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/ai-text-check', { text });
      onResult(response.data);
    } catch (error) {
      console.error('Error checking text:', error);
      setError('An error occurred while checking the text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to check for AI generation..."
        rows="10"
        cols="50"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Checking...' : 'Check for AI Generation'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TextInput;
