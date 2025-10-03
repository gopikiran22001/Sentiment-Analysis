from flask import Flask, request, jsonify
from flask_cors import CORS 
import joblib
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# ================
# Load trained model + vectorizer
# ================
model = joblib.load("sentiment_model.joblib")
vectorizer = joblib.load("vectorizer.joblib")

# Initialize NLP tools
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

# Text preprocessing
def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+|https\S+", '', text)
    text = re.sub(r'@\w+|\#','', text)
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    tokens = [lemmatizer.lemmatize(word) for word in text.split() if word not in stop_words]
    return " ".join(tokens)

# Sentiment prediction
def predict_sentiment(text):
    clean = clean_text(text)
    vec = vectorizer.transform([clean])
    pred = model.predict(vec)[0]
    return pred

# Flask app
app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["GET"])
def predict():
    text = request.args.get("text")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    sentiment = predict_sentiment(text)
    return jsonify({"sentiment": sentiment})

# ✅ Health check endpoint
@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "Service is running"}), 200

if __name__ == "__main__":
    app.run(debug=True)
