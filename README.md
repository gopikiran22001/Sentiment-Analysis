# Sentiment Analysis

A real-time sentiment analysis system that determines the emotional tone behind text (positive, negative, neutral, or irrelevant).

## Quick Start

```bash
# Install dependencies
npm run install

# Start both frontend and backend
npm start
```

## Manual Setup

### Backend (Flask)
```bash
cd Flask
pip install -r requirements.txt
python app.py
```

### Frontend (React)
```bash
cd Client
npm install
npm start
```

## Usage

1. Open http://localhost:3000
2. Enter text in the input box
3. Click "Analyze Sentiment"
4. View the sentiment result

## API

- **GET** `/predict?text=<text>` - Returns sentiment analysis
- **GET** `/health` - Health check

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask, scikit-learn, NLTK
- **ML**: Trained sentiment classification model