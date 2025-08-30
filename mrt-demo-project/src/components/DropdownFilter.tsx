import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';  // 👈 type-only import
import type { FilterOption } from '../filtersConfig';   // 👈 type-only import

interface DropdownFilterProps {
  label: string;
  options: FilterOption[];
  value: string | string[]; // Can be single or multiple
  onChange: (value: string | string[]) => void;
  isMulti?: boolean;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ label, options, value, onChange, isMulti }) => {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={isMulti}
        value={value}
        onChange={handleChange}
        label={label}
        renderValue={isMulti ? (selected) => (selected as string[]).join(', ') : undefined}
      >
        {!isMulti && <MenuItem value=""><em></em></MenuItem>} {/* Option for single select to clear */}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownFilter;