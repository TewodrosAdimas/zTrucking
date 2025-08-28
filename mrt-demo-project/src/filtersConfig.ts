// src/filtersConfig.ts

export type FilterType = 'text' | 'dropdown' | 'dateRange';

export interface FilterOption {
  value: string;
  label: string;
}
export interface FilterConfig {
  id: string; // Unique ID for the filter
  label: string; // Label for the UI
  type: FilterType;
  apiKey: string; // The key to use when sending to an API or filtering mock data
  placeholder?: string; // For text inputs
  options?: FilterOption[]; // For dropdowns
  isMulti?: boolean; // For dropdowns, allows multiple selections
  defaultValue?: string | string[]; // <-- Add this
}



export const filtersConfig: FilterConfig[] = [
  {
    id: 'nameSearch',
    label: 'Name Search',
    type: 'text',
    apiKey: 'name', // We'll combine firstName and lastName for this search
    placeholder: 'Search by first or last name...',
  },
  {
    id: 'emailSearch',
    label: 'Email',
    type: 'text',
    apiKey: 'email',
    placeholder: 'Search by email...',
  },
  {
    id: 'status',
    label: 'Status',
    type: 'dropdown',
    apiKey: 'status',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      // Add other statuses if they appear in your data
    ],
    defaultValue: '', // Start with no selection or a default
  },
  {
    id: 'location',
    label: 'Location',
    type: 'text',
    apiKey: 'location',
    placeholder: 'Search by location...',
  },
  {
    id: 'startDateRange',
    label: 'Start Date Range',
    type: 'dateRange',
    apiKey: 'startDate', // This will need to be handled specially for start/end dates
  },
];