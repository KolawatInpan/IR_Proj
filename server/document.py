import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize
import random

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
    "D11": ["bird"] * 10 + ["cat"] * 9 + ["dog"] * 8 + ["tiger"] * 7,
    "D12": ["bird"] * 23 + ["cat"] * 11 + ["dog"] * 8 + ["tiger"] * 1,
    "D13": ["bird"] * 0 + ["cat"] * 0 + ["dog"] * 11 + ["tiger"] * 25,
    "D14": ["bird"] * 1 + ["cat"] * 2 + ["dog"] * 4 + ["tiger"] * 3,
    "D15": ["bird"] * 8 + ["cat"] * 11 + ["dog"] * 3 + ["tiger"] * 1,
}
words = ["bird", "cat", "dog", "tiger"]

# Convert documents to strings for TF-IDF vectorizer
document_strings = [" ".join(documents[f"D{i}"]) for i in range(1, 16)]

# Create and normalize the TF-IDF matrix
vectorizer = TfidfVectorizer(vocabulary=words)
tfidf_matrix = vectorizer.fit_transform(document_strings).toarray()
normalized_tfidf_matrix = normalize(tfidf_matrix, norm='l2')

def latent_semantic_indexing(documents_matrix, k=4):
    """Perform Latent Semantic Indexing using manual SVD."""
    # Calculate the SVD of the matrix
    U, S, Vt = np.linalg.svd(documents_matrix.T, full_matrices=False)

    # Truncate the matrices to keep only the top k components
    U_k = U[:, :k]  # term-concept matrix
    S_k = np.diag(S[:k])  # singular values matrix
    Vt_k = Vt[:k, :]  # concept-document matrix
    # Calculate the reduced matrix
    reduced_matrix = np.dot(np.dot(U, S_k), Vt_k)
    return reduced_matrix, U_k, S_k, Vt_k


def calculate_cosine_similarity(query_vector, document_matrix):
    """Calculate cosine similarity between query vector and document matrix."""
    similarities = []
    print("docshape",document_matrix.shape)
    for doc_vector in document_matrix.T:
        query_vector = query_vector.reshape(-1)
        print(query_vector.shape, doc_vector.shape)
        norm_query = np.linalg.norm(query_vector)
        norm_doc = np.linalg.norm(doc_vector)
        if norm_query == 0 or norm_doc == 0:
            similarity = 0
        else:
            similarity = np.dot(query_vector, doc_vector) / \
                (norm_query * norm_doc)
        similarities.append(similarity)
    return similarities


def calculate_euclidean_distance(query_vector, document_matrix):
    """Calculate Euclidean distance between query vector and document matrix."""
    distances = []
    for doc_vector in document_matrix.T:
        print(doc_vector, document_matrix)
        distance = np.linalg.norm(query_vector - doc_vector)
        distance = 1 / (1 + distance)  # Convert distance to similarity
        distances.append(distance)
    return distances

def calculate_pearson_correlation(query_vector, document_matrix):
    """Calculate Pearson correlation between query vector and document matrix."""
    correlations = []
    for doc_vector in document_matrix.T:
        if np.std(query_vector) == 0 or np.std(doc_vector) == 0:
            correlation = 0
        else:
            correlation = np.corrcoef(query_vector, doc_vector)[0, 1]
        correlations.append(correlation)
    return correlations


# Perform latent semantic indexing on both the original and normalized TF-IDF matrices
lsi_matrix, U_k, S_k, Vt_k = latent_semantic_indexing(tfidf_matrix)
normalized_lsi_matrix = latent_semantic_indexing(normalized_tfidf_matrix)

def project_query_to_reduced_space(query_counts, U_k, S_k):
    """Project the query vector into the reduced space."""
    query_vector = np.array([query_counts.get(word, 0) for word in words])
    query_vector = query_vector.reshape(-1, 1)  # Change shape to (4, 1)
    query_vector_reduced = np.dot(
        np.dot(query_vector.T, U_k), np.linalg.inv(S_k))
    return query_vector_reduced

def get_cosine_similarity_scores(query_counts):
    query_vector_reduced = project_query_to_reduced_space(
        query_counts, U_k, S_k)
    similarities = calculate_cosine_similarity(query_vector_reduced.T, Vt_k)
    sorted_similarities = sorted(zip(
        [f'Doc{i+1}' for i in range(len(similarities))], similarities), key=lambda x: x[1], reverse=True)
    return sorted_similarities

def get_euclidean_distance_scores(query_counts):
    query_vector_reduced = project_query_to_reduced_space(
        query_counts, U_k, S_k)
    distances = calculate_euclidean_distance(query_vector_reduced, Vt_k)
    sorted_distances = sorted(
        zip([f'Doc{i+1}' for i in range(len(distances))], distances), key=lambda x: x[1], reverse=True)
    return sorted_distances


def get_pearson_correlation_scores(query_counts):
    query_vector_reduced = project_query_to_reduced_space(
        query_counts, U_k, S_k)
    correlations = calculate_pearson_correlation(
        query_vector_reduced, Vt_k)
    sorted_correlations = sorted(zip(
        [f'Doc{i+1}' for i in range(len(correlations))], correlations), key=lambda x: x[1], reverse=True)
    return sorted_correlations
