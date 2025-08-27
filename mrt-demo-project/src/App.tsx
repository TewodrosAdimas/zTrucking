import React, { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import rawData from './data.json'; // Rename to rawData to avoid confusion

// Define the interface for your data
interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: 'Active' | 'Inactive';
  location: string;
  startDate: string;
}

// Explicitly cast the imported data to the Driver[] type
const data: Driver[] = rawData as Driver[];

const App: React.FC = () => {
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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Driver Data</h1>
      {/* Ensure the data prop also uses the typed `data` variable */}
      <MaterialReactTable columns={columns} data={data} enableColumnFilterModes />
    </div>
  );
};

export default App;