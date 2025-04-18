import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure this import is present to apply the styles

function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const { mainFile, results } = location.state || {};
    const [selectedFile, setSelectedFile] = useState('');

    useEffect(() => {
        if (!mainFile || !results) {
            navigate('/plagiarism-check');
        } else {
            setSelectedFile(Object.keys(results)[0]);
        }
    }, [mainFile, results, navigate]);

    if (!mainFile || !results) {
        return null;
    }

    const selectedResult = results[selectedFile];

    return (
        <div className="results-container">
            <h1>Plagiarism Check App - Result</h1>
            <div className="results-content">
                <div className="main-text">
                    <h2>Main Text</h2>
                    <pre>{mainFile.name}</pre>
                </div>
                <div className="comparing-texts">
                    <h2>Comparing Texts</h2>
                    <div className="tabs">
                        {Object.keys(results).map((fileName, idx) => (
                            <button
                                key={idx}
                                className={`tab-button ${selectedFile === fileName ? 'active' : ''}`}
                                onClick={() => setSelectedFile(fileName)}
                            >
                                {fileName}
                            </button>
                        ))}
                    </div>
                    {selectedResult ? (
                        <div className="tab-content">
                            <h4>{selectedFile}</h4>
                            <p>Plagiarism: {selectedResult.plagiarism_percentage.toFixed(2)}%</p>
                            <pre>{selectedResult.text}</pre>
                        </div>
                    ) : (
                        <div className="tab-content">
                            <h4>{selectedFile}</h4>
                            <p>No data available for this file.</p>
                        </div>
                    )}
                </div>
            </div>
            <button className="check-again-button" onClick={() => navigate('/plagiarism-check')}>Check Again</button>
        </div>
    );
}

export default Results;
