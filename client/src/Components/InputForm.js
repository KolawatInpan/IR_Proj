import React from 'react';
import { TextField, Button, Box } from '@mui/material';

function InputForm({ query, handleQueryChange, handleSubmit }) {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Query"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleQueryChange}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
}

export default InputForm;