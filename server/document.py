import numpy as np
import pandas as pd

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


def create_documents_matrix(documents, words):
    documents_matrix = np.array([])
    for i in range(1, 16):
        document = "D" + str(i)
        document_array = documents[document]
        document_array = np.array(document_array)
        document_matrix = np.zeros(len(words))
        for j in range(len(words)):
            document_matrix[j] = np.sum(document_array == words[j])
        if i == 1:
            documents_matrix = document_matrix
        else:
            documents_matrix = np.vstack((documents_matrix, document_matrix))
    return documents_matrix.transpose().astype(int)


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
    for doc_vector in document_matrix.T:
        similarity = np.dot(query_vector, doc_vector) / \
            (np.linalg.norm(query_vector) * np.linalg.norm(doc_vector))
        similarities.append(similarity)
    return similarities


def calculate_euclidean_distance(query_vector, document_matrix):
    distances = []
    for doc_vector in document_matrix.T:
        distance = np.linalg.norm(query_vector - doc_vector)
        distances.append(distance)
    return distances


# Create the documents matrix
documents_matrix = create_documents_matrix(documents, words)

# Perform latent semantic indexing
lsi_matrix = latent_semantic_indexing(documents_matrix)

# Convert to DataFrame for easier handling
lsi_df = pd.DataFrame(lsi_matrix, index=words, columns=[
                      f'Doc{i+1}' for i in range(lsi_matrix.shape[1])])

# Function to get similarity scores using cosine similarity
def get_cosine_similarity_scores(query_counts):
    query_vector = np.array([query_counts.get(word, 0) for word in words])
    similarities = calculate_cosine_similarity(query_vector, lsi_matrix)
    return sorted(zip(lsi_df.columns, similarities), key=lambda x: x[1], reverse=True)

# Function to get similarity scores using Euclidean distance
def get_euclidean_distance_scores(query_counts):
    query_vector = np.array([query_counts.get(word, 0) for word in words])
    distances = calculate_euclidean_distance(query_vector, lsi_matrix)
    return sorted(zip(lsi_df.columns, distances), key=lambda x: x[1], reverse=True)
