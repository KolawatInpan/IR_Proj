from flask import Flask, request, jsonify
from flask_cors import CORS
import document

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/calculate_similarity', methods=['POST'])
def calculate_similarity():
    data = request.json
    query_counts = data.get('wordCounts', {})

    # Calculate both cosine similarity and Euclidean distance
    cosine_similarity_scores = document.get_cosine_similarity_scores(
        query_counts)
    euclidean_distance_scores = document.get_euclidean_distance_scores(
        query_counts)

    return jsonify({
        'cosine_similarities': cosine_similarity_scores,
        'euclidean_distances': euclidean_distance_scores
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
