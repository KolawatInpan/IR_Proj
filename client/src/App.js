import React, { useMemo } from 'react';
import InputForm from './Components/InputForm';
import QueryResults from './Components/QueryResults';
import useSemanticModel from './utils/useSemanticModel';
import { createChartData } from './utils/utils';
import 'chart.js/auto';
import './App.css';

function App() {
  const {
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
  } = useSemanticModel();

  const cosineChartData = useMemo(() => createChartData(
    cosineSimilarities.map(([doc]) => doc),
    cosineSimilarities.map(([, score]) => score),
    'Cosine Similarity Score',
    'rgba(54, 162, 235, 0.6)',
    'rgba(54, 162, 235, 1)'
  ), [cosineSimilarities]);

  const euclideanChartData = useMemo(() => createChartData(
    euclideanDistances.map(([doc]) => doc),
    euclideanDistances.map(([, distance]) => distance),
    'Euclidean Distance',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 159, 64, 1)'
  ), [euclideanDistances]);

  const pearsonChartData = useMemo(() => createChartData(
    pearsonCorrelations.map(([doc]) => doc),
    pearsonCorrelations.map(([, correlation]) => correlation),
    'Pearson Correlation',
    'rgba(75, 192, 192, 0.6)',
    'rgba(75, 192, 192, 1)'
  ), [pearsonCorrelations]);

  const normalizedCosineChartData = useMemo(() => createChartData(
    normalizedCosineSimilarities.map(([doc]) => doc),
    normalizedCosineSimilarities.map(([, score]) => score),
    'Normalized Cosine Similarity Score',
    'rgba(153, 102, 255, 0.6)',
    'rgba(153, 102, 255, 1)'
  ), [normalizedCosineSimilarities]);

  const normalizedEuclideanChartData = useMemo(() => createChartData(
    normalizedEuclideanDistances.map(([doc]) => doc),
    normalizedEuclideanDistances.map(([, distance]) => distance),
    'Normalized Euclidean Distance',
    'rgba(255, 206, 86, 0.6)',
    'rgba(255, 206, 86, 1)'
  ), [normalizedEuclideanDistances]);

  const normalizedPearsonChartData = useMemo(() => createChartData(
    normalizedPearsonCorrelations.map(([doc]) => doc),
    normalizedPearsonCorrelations.map(([, correlation]) => correlation),
    'Normalized Pearson Correlation',
    'rgba(75, 192, 192, 0.6)',
    'rgba(75, 192, 192, 1)'
  ), [normalizedPearsonCorrelations]);

  return (
    <div className="App">
      <h1 className="header">Latent Semantic Model</h1>
      <div className="container">
        <InputForm
          query={query}
          wordCounts={wordCounts}
          handleWordCountChange={handleWordCountChange}
          handleQueryChange={handleQueryChange}
          handleSubmit={handleSubmit}
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <QueryResults
            wordCounts={wordCounts}
            cosineChartData={cosineChartData}
            normalizedCosineChartData={normalizedCosineChartData}
            euclideanChartData={euclideanChartData}
            normalizedEuclideanChartData={normalizedEuclideanChartData}
            pearsonChartData={pearsonChartData}
            normalizedPearsonChartData={normalizedPearsonChartData}
          />
        )}
      </div>
    </div>
  );
}

export default App;