import React from 'react';
import SentimentForm from './components/SentimentForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full flex items-center justify-center">
        <SentimentForm />
      </div>
    </div>
  );
}

export default App;