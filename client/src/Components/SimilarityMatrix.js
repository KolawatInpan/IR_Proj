import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function SimilarityMatrix({ cosineData, euclideanData, pearsonData }) {
  const documents = cosineData.labels;

  return (
    <Box className="similarity-matrix" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Similarity Matrix
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document</TableCell>
              <TableCell>Cosine Similarity</TableCell>
              <TableCell>Euclidean Distance</TableCell>
              <TableCell>Pearson Correlation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell>{doc}</TableCell>
                <TableCell>{cosineData.datasets[0].data[index].toFixed(4)}</TableCell>
                <TableCell>{euclideanData.datasets[0].data[index].toFixed(4)}</TableCell>
                <TableCell>{pearsonData.datasets[0].data[index].toFixed(4)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SimilarityMatrix;