import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import axios from 'axios'; 
import rawMockData from './data.json'; 
import config from './config'; 

// Define the interface for data
interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string; 
  status?: 'Active' | 'Inactive'; 
  location?: string; 
  startDate?: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (config.useMockData) {
          // Use mock data
          const typedMockData: Driver[] = rawMockData as Driver[];
          setData(typedMockData);
        } else {
          // Fetch data from API (JSONPlaceholder users as an example)
          const response = await axios.get(`${config.apiBaseUrl}/users`);
          // Map API response to our Driver interface as best as possible
          const apiDrivers: Driver[] = response.data.map((user: any) => ({
            id: user.id.toString(),
            firstName: user.name.split(' ')[0] || '',
            lastName: user.name.split(' ').slice(1).join(' ') || '',
            email: user.email,
            phoneNumber: user.phone.split(' ')[0] || '', // Simple parse, might need refinement
            status: 'Active', // Default status for API fetched data
            location: user.address.city + ', ' + user.address.zipcode.split('-')[0], // Example location
            startDate: '2023-01-01', // Example start date
          }));
          setData(apiDrivers);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again.');
        setData([]); // Clear data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Define columns for Material React Table
  const columns = useMemo<MRT_ColumnDef<Driver>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'location',
        header: 'Location',
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Loading Driver Data...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Error: {error}</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Driver Data ({config.useMockData ? 'Mock Data' : 'API Data'})</h1>
      <MaterialReactTable columns={columns} data={data} enableColumnFilterModes />
    </div>
  );
};

export default App;