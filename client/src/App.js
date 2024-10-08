import React, { useState } from 'react';
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
  const [similarities, setSimilarities] = useState([]);

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
    setSimilarities(result.similarities);
  };

  return (
    <div className="App">
      <h1>Test</h1>
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
      <h2>Query List</h2>
      <ul>
        {Object.entries(wordCounts).map(([word, count], index) => (
          <li key={index}>{word}: {count}</li>
        ))}
      </ul>
      {similarities.length > 0 && (
        <div>
          <h2>Similarity Scores</h2>
          <ul>
            {similarities.map(([doc, score], index) => (
              <li key={index}>{doc}: {score.toFixed(4)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;