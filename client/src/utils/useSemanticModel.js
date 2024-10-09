import { useState } from 'react';
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
  const [normalizedCosineSimilarities, setNormalizedCosineSimilarities] = useState([]);
  const [normalizedEuclideanDistances, setNormalizedEuclideanDistances] = useState([]);
  const [normalizedPearsonCorrelations, setNormalizedPearsonCorrelations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleWordCountChange = (event) => {
    const { name, value } = event.target;
    const numericValue = Number(value);
    setWordCounts({
      ...wordCounts,
      [name]: numericValue,
    });
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Query submitted:', query);
    console.log('Word counts:', wordCounts);

    // Count the occurrences of each word in the query
    const queryWordCounts = countQueryWords(query);

    // Update the word counts state
    setWordCounts(queryWordCounts);

    try {
      const response = await fetch('http://127.0.0.1:5000/calculate_similarity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, wordCounts: queryWordCounts }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setCosineSimilarities(result.cosine_similarities || []);
      setEuclideanDistances(result.euclidean_distances || []);
      setPearsonCorrelations(result.pearson_correlations || []);
      setNormalizedCosineSimilarities(result.normalized_cosine_similarities || []);
      setNormalizedEuclideanDistances(result.normalized_euclidean_distances || []);
      setNormalizedPearsonCorrelations(result.normalized_pearson_correlations || []);
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
    normalizedCosineSimilarities,
    normalizedEuclideanDistances,
    normalizedPearsonCorrelations,
    loading,
    error,
    handleWordCountChange,
    handleQueryChange,
    handleSubmit,
  };
};

export default useSemanticModel;