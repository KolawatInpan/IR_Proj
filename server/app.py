from flask import Flask, request, jsonify
from flask_cors import CORS
import document

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return 'Index Page'

@app.route('/calculate_similarity', methods=['POST'])
def calculate_similarity():
    data = request.json
    query_counts = data.get('wordCounts', {})

    # Get similarity scores
    similarity_scores = document.get_similarity_scores(query_counts)

    return jsonify({'similarities': similarity_scores})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
