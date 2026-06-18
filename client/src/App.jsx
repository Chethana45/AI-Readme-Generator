import { useState } from "react";
import "./App.css";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [readme, setReadme] = useState("");

  const handleGenerate = () => {
    setLoading(true);

    setTimeout(() => {
      setReadme(`# AI Generated README

## Project Overview
This README was generated using AI.

## Features
- Automated Documentation
- GitHub Repository Analysis
- AI Generated Content

## Installation
npm install

## Usage
npm start
`);
      setLoading(false);
    }, 2500);
  };

  const downloadReadme = () => {
    const blob = new Blob([readme], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <div className="background-glow"></div>

      <div className="container">
        <h1>🚀 AI README Generator</h1>

        <p className="subtitle">
          Generate professional GitHub README files using AI
        </p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Paste GitHub Repository URL..."
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />

          <button onClick={handleGenerate}>
            Generate README
          </button>
        </div>

        <div className="features">
          <div className="feature-card">🤖 AI Powered</div>
          <div className="feature-card">📄 README Preview</div>
          <div className="feature-card">⬇ Download README</div>
          <div className="feature-card">⚡ Fast Generation</div>
        </div>

        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Analyzing Repository...</p>
          </div>
        )}

        {readme && !loading && (
          <div className="preview-section">
            <div className="preview-header">
              <h2>README Preview</h2>

              <button
                className="download-btn"
                onClick={downloadReadme}
              >
                Download README
              </button>
            </div>

            <pre>{readme}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;