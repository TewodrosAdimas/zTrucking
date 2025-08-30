import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface TextSearchFilterProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextSearchFilter: React.FC<TextSearchFilterProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextSearchFilter;