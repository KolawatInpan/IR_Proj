import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize

# Document data
documents = {
    "D1": ["bird", "cat", "cat", "dog", "dog", "bird", "tiger", "tiger"],
    "D2": ["cat", "tiger", "cat", "dog"],
    "D3": ["dog", "bird", "bird", "cat"],
    "D4": ["cat", "tiger", "cat", "dog"],
    "D5": ["tiger", "tiger", "dog", "tiger"],
    "D6": ["cat", "cat", "tiger", "tiger"],
    "D7": ["bird", "cat", "bird"],
    "D8": ["dog", "cat", "bird"],
    "D9": ["cat", "dog", "tiger"],
    "D10": ["tiger", "tiger", "tiger"],
    "D11": ["bird"]*10 + ["cat"]*9 + ["dog"]*8 + ["tiger"]*7,
    "D12": ["bird"]*23 + ["cat"]*11 + ["dog"]*8 + ["tiger"]*1,
    "D13": ["bird"]*0 + ["cat"]*0 + ["dog"]*11 + ["tiger"]*25,
    "D14": ["bird"]*1 + ["cat"]*2 + ["dog"]*4 + ["tiger"]*3,
    "D15": ["bird"]*8 + ["cat"]*11 + ["dog"]*3 + ["tiger"]*1
}
words = ["bird", "cat", "dog", "tiger"]

# Convert documents to strings for TF-IDF vectorizer
document_strings = [" ".join(documents[f"D{i}"]) for i in range(1, 16)]

# Create and normalize the TF-IDF matrix
vectorizer = TfidfVectorizer(vocabulary=words)
tfidf_matrix = vectorizer.fit_transform(document_strings).toarray()
normalized_tfidf_matrix = normalize(tfidf_matrix, norm='l2')


def latent_semantic_indexing(documents_matrix, k=2):
    # Calculate the SVD of the matrix
    U, S, V = np.linalg.svd(documents_matrix)

    # Calculate the reduced matrix
    S = np.diag(S)
    S = S[:k, :k]
    U = U[:, :k]
    V = V[:k, :]

    reduced_matrix = np.dot(np.dot(U, S), V)
    return reduced_matrix


def calculate_cosine_similarity(query_vector, document_matrix):
    similarities = []
    for doc_vector in document_matrix:
        similarity = np.dot(query_vector, doc_vector) / (
            np.linalg.norm(query_vector) * np.linalg.norm(doc_vector)
        )
        similarities.append(similarity)
    return similarities


def calculate_euclidean_distance(query_vector, document_matrix):
    distances = []
    for doc_vector in document_matrix:
        distance = np.linalg.norm(query_vector - doc_vector)
        distances.append(distance)
    return distances


def calculate_pearson_correlation(query_vector, document_matrix):
    correlations = []
    for doc_vector in document_matrix:
        correlation = np.corrcoef(query_vector, doc_vector)[0, 1]
        correlations.append(correlation)
    return correlations


# Perform latent semantic indexing on both the original and normalized TF-IDF matrices
lsi_matrix = latent_semantic_indexing(tfidf_matrix)
normalized_lsi_matrix = latent_semantic_indexing(normalized_tfidf_matrix)

# Ensure the shape matches the number of documents and words
assert lsi_matrix.shape == (len(document_strings),
                            len(words)), "Shape mismatch!"
assert normalized_lsi_matrix.shape == (
    len(document_strings), len(words)), "Shape mismatch!"

# Functions for non-normalized data


def get_cosine_similarity_scores(query_counts):
    query_vector = np.array([query_counts.get(word, 0) for word in words])
    similarities = calculate_cosine_similarity(query_vector, lsi_matrix)
    sorted_similarities = sorted(zip(
        [f'Doc{i+1}' for i in range(len(similarities))], similarities), key=lambda x: x[1], reverse=True)
    return sorted_similarities


def get_euclidean_distance_scores(query_counts):
    query_vector = np.array([query_counts.get(word, 0) for word in words])
    distances = calculate_euclidean_distance(query_vector, lsi_matrix)
    sorted_distances = sorted(zip(
        [f'Doc{i+1}' for i in range(len(distances))], distances), key=lambda x: x[1], reverse=True)
    return sorted_distances


def get_pearson_correlation_scores(query_counts):
    query_vector = np.array([query_counts.get(word, 0) for word in words])
    correlations = calculate_pearson_correlation(query_vector, lsi_matrix)
    sorted_correlations = sorted(zip(
        [f'Doc{i+1}' for i in range(len(correlations))], correlations), key=lambda x: x[1], reverse=True)
    return sorted_correlations

# Functions for normalized data


def get_normalized_cosine_similarity_scores(query_counts):
    query_vector = np.array([query_counts.get(word, 0) for word in words])
    similarities = calculate_cosine_similarity(
        query_vector, normalized_lsi_matrix)
    sorted_similarities = sorted(zip(
        [f'Doc{i+1}' for i in range(len(similarities))], similarities), key=lambda x: x[1], reverse=True)
    return sorted_similarities


def get_normalized_euclidean_distance_scores(query_counts):
    query_vector = np.array([query_counts.get(word, 0) for word in words])
    distances = calculate_euclidean_distance(
        query_vector, normalized_lsi_matrix)
    sorted_distances = sorted(zip(
        [f'Doc{i+1}' for i in range(len(distances))], distances), key=lambda x: x[1], reverse=True)
    return sorted_distances


def get_normalized_pearson_correlation_scores(query_counts):
    query_vector = np.array([query_counts.get(word, 0) for word in words])
    correlations = calculate_pearson_correlation(
        query_vector, normalized_lsi_matrix)
    sorted_correlations = sorted(zip(
        [f'Doc{i+1}' for i in range(len(correlations))], correlations), key=lambda x: x[1], reverse=True)
    return sorted_correlations
