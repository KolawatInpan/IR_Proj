import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import SimilarityMatrix from './SimilarityMatrix'; // Import the new component

function QueryResults({ wordCounts, cosineChartData, euclideanChartData, pearsonChartData, documentWords = [] }) {
  // Custom tooltip callback for cosine similarity
  const cosineTooltipCallback = (tooltipItem) => {
    const index = tooltipItem.dataIndex;
    const label = cosineChartData.labels[index];
    const value = cosineChartData.datasets[0].data[index].toFixed(4);
    return `${label}: ${value}`;
  };

  // Custom tooltip callback for euclidean distance
  const euclideanTooltipCallback = (tooltipItem) => {
    const index = tooltipItem.dataIndex;
    const label = euclideanChartData.labels[index];
    const value = euclideanChartData.datasets[0].data[index].toFixed(4);
    return `${label}: ${value}`;
  };

  // Custom tooltip callback for pearson correlation
  const pearsonTooltipCallback = (tooltipItem) => {
    const index = tooltipItem.dataIndex;
    const label = pearsonChartData.labels[index];
    const value = pearsonChartData.datasets[0].data[index].toFixed(4);
    return `${label}: ${value}`;
  };

  // Chart options with custom tooltips
  const cosineChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: cosineTooltipCallback,
        },
      },
    },
  };

  const euclideanChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: euclideanTooltipCallback,
        },
      },
    },
  };

  const pearsonChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: pearsonTooltipCallback,
        },
      },
    },
  };

  return (
    <Box className="output-wrapper" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Query List
      </Typography>
      <List>
        {Object.entries(wordCounts).map(([word, count], index) => (
          <ListItem key={index}>
            <ListItemText primary={`${word}: ${count}`} />
          </ListItem>
        ))}
      </List>
      <Box className="chart-column" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {cosineChartData.labels.length > 0 && (
          <Box className="chart-container" sx={{ mb: 3 }}>
            <Typography variant="h6">Cosine Similarity Scores</Typography>
            <Bar data={cosineChartData} options={cosineChartOptions} />
          </Box>
        )}
        {euclideanChartData.labels.length > 0 && (
          <Box className="chart-container" sx={{ mb: 3 }}>
            <Typography variant="h6">Euclidean Distances</Typography>
            <Bar data={euclideanChartData} options={euclideanChartOptions} />
          </Box>
        )}
        {pearsonChartData.labels.length > 0 && (
          <Box className="chart-container" sx={{ mb: 3 }}>
            <Typography variant="h6">Pearson Correlations</Typography>
            <Bar data={pearsonChartData} options={pearsonChartOptions} />
          </Box>
        )}
      </Box>
      <SimilarityMatrix
        cosineData={cosineChartData}
        euclideanData={euclideanChartData}
        pearsonData={pearsonChartData}
      />
    </Box>
  );
}

export default QueryResults;