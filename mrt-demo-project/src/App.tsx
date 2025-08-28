import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import axios from "axios";
import rawMockData from "./data.json";
import config from "./config";
import FilterPanel from "./components/FilterPanel";

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  status?: "Active" | "Inactive";
  location?: string;
  startDate?: string;
}

interface JsonPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
}

const App: React.FC = () => {
  const [data, setData] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Phase 3: Filters state
  const [filters, setFilters] = useState({
    searchText: "",
    selectedStatus: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  // Fetch data (Phase 1 & 2)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (config.useMockData) {
          const typedMockData: Driver[] = rawMockData as Driver[];
          setData(typedMockData);
        } else {
          const response = await axios.get<JsonPlaceholderUser[]>(
            `${config.apiBaseUrl}/users`
          );
          const apiDrivers: Driver[] = response.data.map((user) => ({
            id: user.id.toString(),
            firstName: user.name.split(" ")[0] || "",
            lastName: user.name.split(" ").slice(1).join(" ") || "",
            email: user.email,
            phoneNumber: user.phone.split(" ")[0] || "",
            status: "Active",
            location:
              user.address.city + ", " + user.address.zipcode.split("-")[0],
            startDate: "2023-01-01",
          }));
          setData(apiDrivers);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Please try again.");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Phase 3: Filter change handler
  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Phase 3: Apply filters to data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Text search
      if (
        filters.searchText &&
        !`${row.firstName} ${row.lastName}`
          .toLowerCase()
          .includes(filters.searchText.toLowerCase())
      )
        return false;

      // Dropdown filter (status)
      if (filters.selectedStatus && row.status !== filters.selectedStatus)
        return false;

      // Date range filter
      if (filters.startDate && filters.endDate && row.startDate) {
        const rowDate = new Date(row.startDate);
        if (rowDate < filters.startDate || rowDate > filters.endDate)
          return false;
      }

      return true;
    });
  }, [data, filters]);

  const columns = useMemo<MRT_ColumnDef<Driver>[]>(
    () => [
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phoneNumber", header: "Phone Number" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "startDate", header: "Start Date" },
    ],
    []
  );

  if (isLoading)
    return (
      <div style={{ padding: "20px" }}>
        <h1>Loading Driver Data...</h1>
      </div>
    );
  if (error)
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>Error: {error}</h1>
      </div>
    );

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Driver Data ({config.useMockData ? "Mock Data" : "API Data"})</h1>
      {/* Phase 3: Detached Filter Panel */}
      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      <MaterialReactTable
        columns={columns}
        data={filteredData}
        enableColumnFilterModes
      />
    </div>
  );
};

export default App;
