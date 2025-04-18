# PlagChecker 🧠🕵️‍♂️

PlagChecker is a full-stack web application designed to detect plagiarism in text using machine learning. The project combines a React-based frontend, a Flask-powered backend, and a trained ML ensemble model to classify text for potential plagiarism.

## 🔍 Features

- Upload and analyze source and target text files.
- Plagiarism detection using an ensemble machine learning model.
- Real-time results displayed with prediction confidence.
- Clean and responsive UI built with React.
- Backend REST API built with Flask.
- TF-IDF vectorization and model training using Scikit-learn.

---

## 🧱 Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Frontend    | React.js          |
| Backend     | Flask (Python)    |
| ML Model    | Scikit-learn      |
| NLP Tools   | NLTK, TfidfVectorizer |
| Deployment  | Flask App Server  |
| Model Saving| Pickle            |

---

## 🧠 Machine Learning Model

The ML model is an ensemble of:

- **Logistic Regression**
- **Random Forest** (with GridSearchCV tuning)
- **Multinomial Naive Bayes**

### Pipeline:

1. **Data Preprocessing:**
   - Removes punctuation
   - Converts to lowercase
   - Removes stopwords using NLTK

2. **Vectorization:**
   - TF-IDF Vectorizer with 10,000 max features.

3. **Model Training:**
   - Training/test split (80/20)
   - Soft Voting Ensemble for better probability-weighted predictions

4. **Performance:**
   - Evaluated using accuracy, confusion matrix, and cross-validation
   - Final model saved as `optimized_ensemble_model.pkl`
   - Vectorizer saved as `tfidf_vectorizer.pkl`

---

## 🚀 How to Run the Project

### 🧰 Prerequisites

- Python 3.8+
- Node.js (for React)
- pip (Python package manager)

---

### 🔧 Backend Setup (Flask)

1. Clone the repo:
   ```bash
git clone https://github.com/DevSohel313/PlagChecker.git
cd PlagChecker/backend

2. Create a virtual environment and activate it:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

3.Install dependencies:
pip install -r requirements.txt

4.Run Flask server:
python main.py


.

🌐 Frontend Setup (React)

Open another terminal:
cd ../frontend
npm install
npm start

React dev server will start on http://localhost:3000



📊 Model Evaluation
Cross-Validation Accuracy: ~87-91%

Classification Report: Included in training output

Model Type: Soft-voting ensemble classifier

📦 To-Do / Future Work
Add login/signup authentication

Include side-by-side plagiarism highlighting

Dockerize the application

Integrate cloud storage for large file processing

Deploy on Heroku/Vercel with CI/CD

