import { useState, useEffect } from 'react';
import { countQueryWords } from './utils';

const useSemanticModel = () => {
  const [query, setQuery] = useState('');
  const [wordCounts, setWordCounts] = useState({
    bird: 0,
    cat: 0,
    dog: 0,
    tiger: 0,
  });
  const [cosineSimilarities, setCosineSimilarities] = useState([]);
  const [euclideanDistances, setEuclideanDistances] = useState([]);
  const [pearsonCorrelations, setPearsonCorrelations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documentWords, setDocumentWords] = useState({}); // New state for document words
  const [lsiMatrix, setLsiMatrix] = useState([]); // New state for LSI matrix

  useEffect(() => {
    // Fetch the documents data when the component mounts
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/documents');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDocumentWords(data);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch the LSI matrix data when the component mounts
    const fetchLsiMatrix = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/lsi_matrix');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLsiMatrix(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDocuments();
    fetchLsiMatrix();
  }, []);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Count the occurrences of each word in the query
    const queryWordCounts = countQueryWords(newQuery);

    // Update the word counts state
    setWordCounts(queryWordCounts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Query submitted:', query);
    console.log('Word counts:', wordCounts);

    // Check if word count is zero
    const totalWordCount = Object.values(wordCounts).reduce((a, b) => a + b, 0);
    if (totalWordCount === 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/calculate_similarity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, wordCounts }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setCosineSimilarities(result.cosine_similarities || []);
      setEuclideanDistances(result.euclidean_distances || []);
      setPearsonCorrelations(result.pearson_correlations || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    wordCounts,
    cosineSimilarities,
    euclideanDistances,
    pearsonCorrelations,
    loading,
    error,
    handleQueryChange,
    handleSubmit,
    documentWords, // Return document words
    lsiMatrix, // Return LSI matrix
  };
};

export default useSemanticModel;