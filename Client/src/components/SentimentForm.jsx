import React, { useState } from 'react';

const SentimentForm = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/predict?text=${encodeURIComponent(text)}`);
      
      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setResult(data.sentiment);
    } catch (err) {
      setError('Failed to analyze sentiment. Please check if the API is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Sentiment Analysis
      </h1>
      
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
        />
        
        <button
          onClick={analyzeSentiment}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
        >
          {loading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>

        {error && (
          <div className="p-3 text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className={`p-3 border rounded-lg ${getSentimentColor(result)}`}>
            <strong>Sentiment: {result}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentForm;