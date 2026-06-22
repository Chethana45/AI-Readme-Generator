import { useState } from "react";
import "./App.css";

function App() {
const [repoUrl, setRepoUrl] = useState("");
const [loading, setLoading] = useState(false);
const [readme, setReadme] = useState("");

const handleGenerate = async () => {
if (!repoUrl) {
alert("Please enter a GitHub repository URL");
return;
}

try {
  setLoading(true);

  const response = await fetch(
  `${import.meta.env.VITE_API_URL}/analyze`,
  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repoUrl,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to generate README"
    );
  }

  setReadme(data.readme);
} catch (error) {
  console.error(error);
  alert(error.message);
} finally {
  setLoading(false);
}


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

return ( <div className="app"> <div className="background-glow"></div>

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

      <button
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate README"}
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
