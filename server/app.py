from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import document

app = Flask(__name__, static_folder='static')
CORS(app)  # Enable CORS for all routes


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)


@app.route('/calculate_similarity', methods=['POST'])
def calculate_similarity():
    data = request.json
    query_counts = data.get('wordCounts', {})

    # Calculate cosine similarity, Euclidean distance, and Pearson correlation
    cosine_similarity_scores = document.get_cosine_similarity_scores(
        query_counts)
    euclidean_distance_scores = document.get_euclidean_distance_scores(
        query_counts)
    pearson_correlation_scores = document.get_pearson_correlation_scores(
        query_counts)

    # Calculate normalized cosine similarity, Euclidean distance, and Pearson correlation
    normalized_cosine_similarity_scores = document.get_normalized_cosine_similarity_scores(
        query_counts)
    normalized_euclidean_distance_scores = document.get_normalized_euclidean_distance_scores(
        query_counts)
    normalized_pearson_correlation_scores = document.get_normalized_pearson_correlation_scores(
        query_counts)

    return jsonify({
        'cosine_similarities': cosine_similarity_scores,
        'euclidean_distances': euclidean_distance_scores,
        'pearson_correlations': pearson_correlation_scores,
        'normalized_cosine_similarities': normalized_cosine_similarity_scores,
        'normalized_euclidean_distances': normalized_euclidean_distance_scores,
        'normalized_pearson_correlations': normalized_pearson_correlation_scores
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
