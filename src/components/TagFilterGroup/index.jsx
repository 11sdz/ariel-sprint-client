import React, { useEffect } from 'react';
import { Box, Chip, Typography } from '@mui/material';

export default function TagFilterGroup({ label, options = [], selected = [], onChange }) {
  const handleToggle = (tag) => {
    const isSelected = selected.includes(tag);
    const updated = isSelected
      ? selected.filter((t) => t !== tag)
      : [...selected, tag];
    onChange(updated);
  };


  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {options.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleToggle(tag)}
            color={selected.includes(tag) ? 'primary' : 'default'}
            variant={selected.includes(tag) ? 'filled' : 'outlined'}
            clickable
          />
        ))}
      </Box>
    </Box>
  );
}
