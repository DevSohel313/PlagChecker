import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FileUpload() {
  const [mainFile, setMainFile] = useState(null);
  const [otherFiles, setOtherFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [level, setLevel] = useState(3); // Assuming you want to display this level
  const navigate = useNavigate();

  const handleMainFileChange = (event) => {
    setMainFile(event.target.files[0]);
  };

  const handleOtherFilesChange = (event) => {
    setOtherFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!mainFile || otherFiles.length === 0) {
      alert("Please select a main file and at least one other file.");
      return;
    }
  
    const formData = new FormData();
    formData.append('mainfile', mainFile);
    for (let i = 0; i < otherFiles.length; i++) {
      formData.append('otherfiles', otherFiles[i]);
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      setResults(result.results);  // Store the plagiarism check results in state
      navigate('/results', { state: { mainFile, results: result.results } });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the files. Please try again.");
    }
  };
  
  return (
    <div>
      <h1>Plagiarism Check App</h1>
      {!results ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Main File:</label>
            <input type="file" onChange={handleMainFileChange} />
          </div>
          <div>
            <label>Other Files:</label>
            <input type="file" multiple onChange={handleOtherFilesChange} />
          </div>
          <div>
            <label>Select the Level:</label>
            <input
              type="range"
              min="1"
              max="5"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
            <span>{level}</span>
          </div>
          <button type="submit">Check</button>
        </form>
      ) : (
        <div>
          <h2>Plagiarism Check App - Result</h2>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3>Main File: {mainFile.name}</h3>
                <pre>{mainFile.name}</pre>
              </div>
              <div>
                <label>Comparing Texts</label>
                <select>
                  {Object.keys(results).map((fileName, idx) => (
                    <option key={idx} value={fileName}>
                      {fileName}
                    </option>
                  ))}
                </select>
                <pre>
                  {Object.keys(results).map((fileName, idx) => (
                    <div key={idx}>
                      <h4>{fileName}</h4>
                      <p>Plagiarism: {results[fileName].plagiarism_percentage.toFixed(2)}%</p>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
          <button onClick={() => setResults(null)}>Check Again</button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
