"use client";
import React, { useState } from "react";

export default function ParaphrasePage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleParaphrase = () => {
    if (!inputText.trim()) {
      setOutputText("");
      setLoading(false);
      return;
    }
    setLoading(true);
    // Mock paraphrasing logic
    setTimeout(() => {
      setOutputText(`Mock Paraphrased: ${inputText}`);
      setLoading(false);
    }, 500); // Simulate a short delay
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Paraphrase Tool</h2>

      <div className="mb-6">
        <label htmlFor="inputText" className="block text-xl font-semibold mb-2 text-gray-900">Input Text:</label>
        <textarea
          id="inputText"
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to paraphrase..."
        ></textarea>
      </div>

      <div className="mb-6 text-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleParaphrase}
          disabled={loading}
        >
          {loading ? "Paraphrasing..." : "Paraphrase"}
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="outputText" className="block text-xl font-semibold mb-2 text-gray-900">Paraphrased Text:</label>
        <textarea
          id="outputText"
          className="w-full h-40 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 cursor-not-allowed"
          value={outputText}
          readOnly
          placeholder="Paraphrased text will appear here..."
        ></textarea>
      </div>

      <div className="text-center text-gray-600 italic text-sm">
        Note: This is a mock version. AI-powered paraphrasing is coming soon!
      </div>
    </div>
  );
} 