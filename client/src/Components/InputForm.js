import React from 'react';

function InputForm({ query, wordCounts, handleWordCountChange, handleQueryChange, handleSubmit }) {
  return (
    <div className="input-wrapper">
      <form onSubmit={handleSubmit}>
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