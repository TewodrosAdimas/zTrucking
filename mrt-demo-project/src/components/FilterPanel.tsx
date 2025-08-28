// src/components/FilterPanel.tsx
import React from "react";
import Box from "@mui/material/Box";
import TextSearchFilter from "./TextSearchFilter";
import DropdownFilter from "./DropdownFilter";
import DateRangeFilter from "./DateRangeFilter";

// Define the filters state type
export interface FiltersState {
  searchText: string;
  selectedStatus: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface FilterPanelProps {
  filters: FiltersState;
  onFilterChange: <K extends keyof FiltersState>(filterName: K, value: FiltersState[K]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Text search filter */}
      <TextSearchFilter
        label="Search Name"
        placeholder="Enter first or last name..."
        value={filters.searchText}
        onChange={(val) => onFilterChange("searchText", val)}
      />

      {/* Status dropdown filter */}
      <DropdownFilter
        label="Status"
        value={filters.selectedStatus}
        onChange={(val) => onFilterChange("selectedStatus", val as string)}
        options={[
          { label: "All", value: "" },
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ]}
      />

      {/* Date range filter */}
      <DateRangeFilter
        label="Start Date Range"
        startDate={filters.startDate}
        endDate={filters.endDate}
        onChange={({ startDate, endDate }) => {
          onFilterChange("startDate", startDate);
          onFilterChange("endDate", endDate);
        }}
      />
    </Box>
  );
};

export default FilterPanel;
