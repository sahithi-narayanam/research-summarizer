import React, { useState } from "react";
import axios from "axios";

const PaperCard = ({ paper }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/summarize-paper", {
        params: { arxiv_url: paper.url },
      });
      setSummary(response.data.summary);
    } catch (err) {
      setSummary("Error fetching summary.");
    }
    setLoading(false);
  };

  return (
    <div className="border p-4 my-2 rounded shadow">
      <h2 className="text-lg font-semibold">{paper.title}</h2>
      <p className="text-sm text-gray-600">{paper.summary.slice(0, 300)}...</p>
      <button
        onClick={handleSummarize}
        className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {summary && (
        <div className="mt-2 text-sm text-gray-800 bg-gray-100 p-2 rounded">
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
};

export default PaperCard;
