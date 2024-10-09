import React from 'react';

function InputForm({ query, wordCounts, handleWordCountChange, handleQueryChange, handleSubmit }) {
  return (
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
        <div>
          <label>
            Query:
            <input
              type="text"
              name="query"
              value={query}
              onChange={handleQueryChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputForm;