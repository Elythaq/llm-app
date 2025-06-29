'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate() {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        throw new Error('API error');
      }
      const data = await res.json();
      setResponse(data.response);
    } catch (err: any) {
      setError('Failed to generate response.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
      <div className="w-full max-w-lg space-y-4">
        <h1 className="text-3xl font-bold text-center">Local LLM Prompt</h1>
        <textarea
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />
        <button
          className="w-full py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {response && (
          <div className="mt-4 p-3 rounded bg-gray-800 border border-green-500">
            <div className="font-semibold mb-2 text-green-400">Response:</div>
            <pre className="whitespace-pre-wrap">{response}</pre>
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 rounded bg-red-900 border border-red-500 text-red-200">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
