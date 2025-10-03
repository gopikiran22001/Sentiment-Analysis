import React, { useState } from 'react';

const apiBaseUrl="http://localhost:8000";
const SentimentForm = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);

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

  const clearAll = () => {
    setText('');
    setResult('');
    setError('');
    setShowResult(false);
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
      const response = await fetch(`${apiBaseUrl}/predict?text=${encodeURIComponent(text)}`);
      
      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setResult(data.sentiment);
      setShowResult(true);
    } catch (err) {
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl text-white">🧠</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Sentiment Analysis
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Discover the emotion behind your text</p>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling today? Share your thoughts..."
            className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
            rows="4"
            maxLength="500"
          />
          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs text-gray-400">
            {text.length}/500
          </div>
        </div>
        
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={analyzeSentiment}
            disabled={loading || !text.trim()}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-semibold text-sm sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none active:scale-95"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                <span className="text-sm sm:text-base">Analyzing...</span>
              </div>
            ) : (
              <span className="text-sm sm:text-base">✨ Analyze</span>
            )}
          </button>
          
          {(text || result || error) && (
            <button
              onClick={clearAll}
              className="px-3 sm:px-4 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all duration-200 active:scale-95"
            >
              <span className="text-lg">🗑️</span>
            </button>
          )}
        </div>

        {error && (
          <div className="p-3 sm:p-4 text-red-700 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 rounded-lg">
            <div className="flex items-start space-x-2">
              <span className="text-lg mt-0.5">⚠️</span>
              <span className="text-sm sm:text-base">{error}</span>
            </div>
          </div>
        )}

        {showResult && result && (
          <div className={`p-4 sm:p-6 border-2 rounded-xl ${getSentimentColor(result)} transform transition-all duration-500 scale-100`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl sm:text-3xl">{getSentimentIcon(result)}</span>
                <div>
                  <p className="text-xs sm:text-sm font-medium opacity-75">Detected Sentiment</p>
                  <p className="text-lg sm:text-2xl font-bold capitalize">{result}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
                  <span className="text-sm sm:text-xl">✨</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {showResult && (
          <div className="text-center">
            <button
              onClick={() => setText('')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              Try another text →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentForm;