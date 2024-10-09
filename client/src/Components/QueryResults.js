import React from 'react';
import { Bar } from 'react-chartjs-2';

function QueryResults({ wordCounts, cosineChartData, normalizedCosineChartData, euclideanChartData, normalizedEuclideanChartData, pearsonChartData, normalizedPearsonChartData }) {
  return (
    <div className="output-wrapper">
      <h2>Query List</h2>
      <ul>
        {Object.entries(wordCounts).map(([word, count], index) => (
          <li key={index}>{word}: {count}</li>
        ))}
      </ul>
      <div className="chart-row">
        {cosineChartData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Cosine Similarity Scores</h2>
            <Bar data={cosineChartData} />
          </div>
        )}
        {normalizedCosineChartData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Normalized Cosine Similarity Scores</h2>
            <Bar data={normalizedCosineChartData} />
          </div>
        )}
      </div>
      <div className="chart-row">
        {euclideanChartData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Euclidean Distances</h2>
            <Bar data={euclideanChartData} />
          </div>
        )}
        {normalizedEuclideanChartData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Normalized Euclidean Distances</h2>
            <Bar data={normalizedEuclideanChartData} />
          </div>
        )}
      </div>
      <div className="chart-row">
        {pearsonChartData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Pearson Correlations</h2>
            <Bar data={pearsonChartData} />
          </div>
        )}
        {normalizedPearsonChartData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Normalized Pearson Correlations</h2>
            <Bar data={normalizedPearsonChartData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default QueryResults;