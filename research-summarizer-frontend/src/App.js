import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [topic, setTopic] = useState("");
  const [numPapers, setNumPapers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [papers, setPapers] = useState([]); // List of papers
  const [selectedSummary, setSelectedSummary] = useState(""); // Summary of selected paper

  // Fetch papers based on the topic
  const handleSearch = async () => {
    if (numPapers < 1) {
      setError("Number of papers must be at least 1.");
      return;
    }

    setError("");
    setLoading(true);
    setPapers([]);
    setSelectedSummary("");

    try {
      const response = await axios.get("http://localhost:8000/papers", {
        params: {
          topic,
          limit: numPapers,
        },
      });

      setPapers(response.data.ranked_papers); // Backend returns ranked papers
    } catch (err) {
      console.error("Error fetching papers", err);
      setError("Failed to fetch papers.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the summary for a selected paper
  const fetchSummary = async (url) => {
    setLoading(true);
    setSelectedSummary("");

    try {
      const response = await axios.get("http://localhost:8000/summarize-paper", {
        params: {
          arxiv_url: url,
        },
      });

      setSelectedSummary(response.data.summary); // Backend returns the summary
    } catch (err) {
      console.error("Error fetching summary", err);
      setError("Failed to fetch summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Research Paper Summarizer
      </h1>

      {/* Search Form */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g., Artificial Intelligence)"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={numPapers}
          onChange={(e) => setNumPapers(Number(e.target.value))}
          placeholder="Number of Papers"
          className="w-32 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={1}
        />
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

      {/* Loading */}
      {loading && <p className="mt-4 text-blue-500 font-medium">Loading...</p>}

      {/* Papers List */}
      {papers.length > 0 && (
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Papers:</h2>
          <ul>
            {papers.map((paper) => (
              <li key={paper.id} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{paper.title}</h3>
                  <p className="text-sm text-gray-500">
                    <strong>Authors:</strong> {paper.authors.length > 0 ? paper.authors.join(", ") : "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Published:</strong>{" "}
                    {paper.published
                      ? new Date(paper.published).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Abstract:</strong> {paper.abstract || "No abstract available."}
                  </p>
                </div>
                <div className="mt-2 flex justify-end">
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4 px-4 py-2 text-blue-600 font-semibold hover:underline"
                  >
                    View Full Paper
                  </a>
                  <button
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    onClick={() => fetchSummary(paper.url)}
                  >
                    View Summary
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected Summary */}
      {selectedSummary && (
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Paper Summary:</h2>
          <p className="text-gray-700">{selectedSummary}</p>
        </div>
      )}
    </div>
  );
}
