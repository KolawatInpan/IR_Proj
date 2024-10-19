import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TermDocumentMatrix({ termDocumentData }) {
  if (!termDocumentData || Object.keys(termDocumentData).length === 0) {
    return (
      <Box className="term-document-matrix" sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Term-Document Matrix
        </Typography>
        <Typography variant="body1">No data available</Typography>
      </Box>
    );
  }

  const terms = Array.from(new Set(Object.values(termDocumentData).flat()));
  const documents = Object.keys(termDocumentData).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    return numA - numB;
  });

  const getTermCount = (term, doc) => {
    return termDocumentData[doc].filter(word => word === term).length;
  };

  return (
    <Box className="term-document-matrix" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Term-Document Matrix
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Term</TableCell>
              {documents.map((doc, index) => (
                <TableCell key={index}>{doc}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {terms.map((term, index) => (
              <TableRow key={index}>
                <TableCell>{term}</TableCell>
                {documents.map((doc, docIndex) => (
                  <TableCell key={docIndex}>{getTermCount(term, doc)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TermDocumentMatrix;