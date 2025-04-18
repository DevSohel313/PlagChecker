import sklearn
print(sklearn.__version__)
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# Explicitly allow React app origin
#Load your trained model and vectorizer for AI text checking

# Load your trained model and vectorizer for AI text checking
model = pickle.load(open('optimized_ensemble_model.pkl', 'rb'))
tfidf_vectorizer = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))



def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'txt', 'pdf', 'doc', 'docx'}

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'mainfile' not in request.files:
        return jsonify({"error": "Main file is missing"}), 400
    if 'otherfiles' not in request.files:
        return jsonify({"error": "Other files are missing"}), 400

    mainfile = request.files['mainfile']
    otherfiles = request.files.getlist('otherfiles')

    if not allowed_file(mainfile.filename):
        return jsonify({"error": "Main file type not allowed"}), 400

    mainfile_content = mainfile.read().decode('utf-8', errors='ignore')
    plagiarism_results = {}

    for idx, file in enumerate(otherfiles):
        if not allowed_file(file.filename):
            continue

        otherfile_content = file.read().decode('utf-8', errors='ignore')

        mainfile_lines = set(mainfile_content.splitlines())
        otherfile_lines = set(otherfile_content.splitlines())

        if not mainfile_lines:
            return jsonify({"error": "Main file is empty"}), 400

        common_lines = mainfile_lines.intersection(otherfile_lines)
        plagiarism_percentage = (len(common_lines) / len(mainfile_lines)) * 100

        plagiarism_results[file.filename] = {
            "common_lines": len(common_lines),
            "plagiarism_percentage": plagiarism_percentage
        }

    return jsonify({
        "message": "Plagiarism check completed",
        "results": plagiarism_results
    }), 200


@app.route('/ai-text-check', methods=['POST'])
def ai_text_check():
    data = request.get_json()
    input_text = data.get("text")
    
    # Vectorize the input text
    vectorized_text = tfidf_vectorizer.transform([input_text])
    
    # Make the prediction
    result = model.predict(vectorized_text) 
    
    return jsonify({
        "prediction": "AI Generated" if result[0] == 1 else "Human Generated"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Use port 5000
