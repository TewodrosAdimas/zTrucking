// src/components/DateRangeFilter.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Don't forget to import the CSS!
import { TextField, InputAdornment, Box, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

// This component will manage its own internal state for start and end date
// And then call onChange with an object { startDate: Date | null, endDate: Date | null }
interface DateRangeFilterProps {
  label: string;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  label,
  startDate,
  endDate,
  onChange,
}) => {
  const handleStartDateChange = (date: Date | null) => {
    onChange({ startDate: date, endDate });
  };

  const handleEndDateChange = (date: Date | null) => {
    onChange({ startDate, endDate: date });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          customInput={
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
            />
          }
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || undefined} // ✅ ensures type matches
          placeholderText="End Date"
          customInput={
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default DateRangeFilter;
