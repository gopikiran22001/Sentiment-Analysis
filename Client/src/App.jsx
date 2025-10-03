import React from 'react';
import SentimentForm from './components/SentimentForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <SentimentForm />
    </div>
  );
}

export default App;