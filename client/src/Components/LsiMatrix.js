import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function LsiMatrix({ lsiMatrix }) {
  if (!lsiMatrix || lsiMatrix.length === 0) {
    return (
      <Box className="lsi-matrix" sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          LSI Matrix
        </Typography>
        <Typography variant="body1">No data available</Typography>
      </Box>
    );
  }

  const words = ['bird', 'cat', 'dog', 'tiger'];
  const documents = lsiMatrix.map((_, index) => `D${index + 1}`);

  return (
    <Box className="lsi-matrix" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        LSI Matrix
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              {documents.map((doc, index) => (
                <TableCell key={index}>{doc}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {words.map((word, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{word}</TableCell>
                {lsiMatrix.map((row, colIndex) => (
                  <TableCell key={colIndex}>{row[rowIndex].toFixed(4)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default LsiMatrix;