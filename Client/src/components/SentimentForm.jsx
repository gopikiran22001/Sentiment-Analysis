import React, { useState } from 'react';

const SentimentForm = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-green-700 bg-gradient-to-r from-green-50 to-green-100 border-green-300';
      case 'negative': return 'text-red-700 bg-gradient-to-r from-red-50 to-red-100 border-red-300';
      default: return 'text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      case 'neutral': return '😐';
      default: return '🤔';
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
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
          <span className="text-2xl text-white">🧠</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Sentiment Analysis
        </h1>
        <p className="text-gray-500 mt-2">Discover the emotion behind your text</p>
      </div>
      
      <div className="space-y-6">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here and let AI analyze its sentiment..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 text-gray-700 placeholder-gray-400"
            rows="5"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {text.length}/500
          </div>
        </div>
        
        <button
          onClick={analyzeSentiment}
          disabled={loading || !text.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            'Analyze Sentiment'
          )}
        </button>

        {error && (
          <div className="p-4 text-red-700 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 rounded-lg animate-pulse">
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {result && (
          <div className={`p-6 border-2 rounded-xl ${getSentimentColor(result)} transform transition-all duration-300 animate-pulse`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getSentimentIcon(result)}</span>
                <div>
                  <p className="text-sm font-medium opacity-75">Detected Sentiment</p>
                  <p className="text-2xl font-bold capitalize">{result}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
                  <span className="text-xl">✨</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentForm;