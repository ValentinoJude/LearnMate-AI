"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

type DocumentMetadata = {
  id: string; // Unique ID
  name: string;
  size: number; // in bytes
  type: string; // e.g., 'application/pdf', 'text/plain'
  uploadDate: string; // ISO string
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [uploadMessage, setUploadMessage] = useState("");

  // Load documents from Local Storage on mount
  useEffect(() => {
    const savedDocuments = localStorage.getItem('documents');
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, []);

  // Save documents to Local Storage when the list changes
  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setUploadMessage("No file selected.");
      return;
    }

    const newDocuments: DocumentMetadata[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newDocuments.push({
        id: `${file.name}-${file.size}-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
      });
    }

    setDocuments((prev) => [...prev, ...newDocuments]);
    setUploadMessage(`${newDocuments.length} file(s) added metadata.`);
    // Clear the input value so the same file can be uploaded again if needed
    if (event.target) {
        event.target.value = '';
    }
  }

  function handleDeleteDocument(id: string) {
    setDocuments(documents.filter(doc => doc.id !== id));
  }

  // Helper to format file size
  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Documents</h2>

      {/* Upload Area */}
      <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <input
          type="file"
          multiple
          className="hidden"
          id="file-upload"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
          Select or Drag Files
        </label>
        {uploadMessage && <p className="mt-2 text-sm text-gray-600">{uploadMessage}</p>}
        <p className="mt-1 text-sm text-gray-500">Upload documents (metadata only saved for now)</p>
      </div>

      {/* Document List */}
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Uploaded Documents</h3>
      {documents.length === 0 ? (
        <div className="text-gray-500">No documents uploaded yet.</div>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li key={doc.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-grow">
                {/* Basic File Icon Placeholder */}
                <span className="text-2xl">📄</span>
                <div>
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-sm text-gray-600">{formatBytes(doc.size)} - {new Date(doc.uploadDate).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                {/* View Placeholder */}
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
                  onClick={() => alert("Document viewing coming soon!")}
                >
                  View
                </button>
                {/* Generate Summary Placeholder */}
                <button
                  className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-sm hover:bg-yellow-300 transition"
                  onClick={() => alert("Generate summary coming soon!")}
                >
                  Summarize (AI)
                </button>
                {/* Delete Button */}
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                  onClick={() => handleDeleteDocument(doc.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
       <p className="mt-6 text-sm text-gray-600 border-t border-gray-200 pt-4">
          Note: Uploaded document metadata is saved in your browser's Local Storage. The actual file content is not stored. Future updates will enable using these documents to generate lessons for your custom courses.
        </p>
    </div>
  );
} 