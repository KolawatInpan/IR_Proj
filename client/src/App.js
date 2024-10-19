import React, { useMemo } from 'react';
import InputForm from './Components/InputForm';
import QueryResults from './Components/QueryResults';
import TermDocumentMatrix from './Components/TermDocumentMatrix'; // Import the new component
import LsiMatrix from './Components/LsiMatrix'; // Import the new component
import useSemanticModel from './utils/useSemanticModel';
import { createChartData } from './utils/utils';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import 'chart.js/auto';
import './App.css';

function App() {
  const {
    query,
    wordCounts,
    cosineSimilarities,
    euclideanDistances,
    pearsonCorrelations,
    loading,
    error,
    handleQueryChange,
    handleSubmit,
    documentWords, // Destructure documentWords
    lsiMatrix, // Destructure lsiMatrix
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

  return (
    <Container className="App" sx={{ mt: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Latent Semantic Model
      </Typography>
      <InputForm
        query={query}
        handleQueryChange={handleQueryChange}
        handleSubmit={handleSubmit}
      />
      {loading && <CircularProgress sx={{ mt: 3 }} />}
      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
      {!loading && !error && (
        <>
          <TermDocumentMatrix termDocumentData={documentWords} /> {/* Add the new component */}
          <LsiMatrix lsiMatrix={lsiMatrix} /> {/* Add the new component */}
          <QueryResults
            wordCounts={wordCounts}
            cosineChartData={cosineChartData}
            euclideanChartData={euclideanChartData}
            pearsonChartData={pearsonChartData}
            documentWords={documentWords} // Pass documentWords to QueryResults
          />

        </>
      )}
    </Container>
  );
}

export default App;