import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

function App() {
  // State to hold the query input value
  const [query, setQuery] = useState('');
  // State to hold the word counts
  const [wordCounts, setWordCounts] = useState({
    bird: 0,
    cat: 0,
    dog: 0,
    tiger: 0,
  });
  // State to hold the similarity scores
  const [cosineSimilarities, setCosineSimilarities] = useState([]);
  const [euclideanDistances, setEuclideanDistances] = useState([]);

  // Handle input change for word counts
  const handleWordCountChange = (event) => {
    const { name, value } = event.target;
    setWordCounts({
      ...wordCounts,
      [name]: Number(value),
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Query submitted:', query);
    console.log('Word counts:', wordCounts);

    // Send data to Flask API
    const response = await fetch('http://127.0.0.1:5000/calculate_similarity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, wordCounts }),
    });

    const result = await response.json();
    setCosineSimilarities(result.cosine_similarities);
    setEuclideanDistances(result.euclidean_distances);
  };

  // Prepare data for the cosine similarity chart
  const cosineChartData = {
    labels: cosineSimilarities.map(([doc]) => doc),
    datasets: [
      {
        label: 'Cosine Similarity Score',
        data: cosineSimilarities.map(([, score]) => score),
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Darker blue
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the Euclidean distance chart
  const euclideanChartData = {
    labels: euclideanDistances.map(([doc]) => doc),
    datasets: [
      {
        label: 'Euclidean Distance',
        data: euclideanDistances.map(([, distance]) => distance),
        backgroundColor: 'rgba(255, 159, 64, 0.6)', // Darker orange
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <h1 className="header">Latent Semantic Model</h1>
      <div className="container">
        <div className="input-wrapper">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Bird:
                <input
                  type="number"
                  name="bird"
                  value={wordCounts.bird}
                  onChange={handleWordCountChange}
                />
              </label>
            </div>
            <div>
              <label>
                Cat:
                <input
                  type="number"
                  name="cat"
                  value={wordCounts.cat}
                  onChange={handleWordCountChange}
                />
              </label>
            </div>
            <div>
              <label>
                Dog:
                <input
                  type="number"
                  name="dog"
                  value={wordCounts.dog}
                  onChange={handleWordCountChange}
                />
              </label>
            </div>
            <div>
              <label>
                Tiger:
                <input
                  type="number"
                  name="tiger"
                  value={wordCounts.tiger}
                  onChange={handleWordCountChange}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="output-wrapper">
          <h2>Query List</h2>
          <ul>
            {Object.entries(wordCounts).map(([word, count], index) => (
              <li key={index}>{word}: {count}</li>
            ))}
          </ul>
          {cosineSimilarities.length > 0 && (
            <div>
              <h2>Cosine Similarity Scores</h2>
              <Bar data={cosineChartData} />
            </div>
          )}
          {euclideanDistances.length > 0 && (
            <div>
              <h2>Euclidean Distances</h2>
              <Bar data={euclideanChartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;