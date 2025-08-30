import React, { useMemo, useState, useEffect, useCallback } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import axios from "axios";
import rawMockData from "./data.json";
import config from "./config";
import FilterPanel from "./components/FilterPanel"; 
import ExportButtons from "./components/ExportButtons";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  useMediaQuery,
  Paper,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BackButton from "./components/BackButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export interface Driver {
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

export interface FiltersState {
  searchText: string;
  selectedStatus: string;
  startDate: Date | null;
  endDate: Date | null;
}

const AppContent: React.FC<{
  toggleDarkMode: () => void;
  darkMode: boolean;
}> = ({ toggleDarkMode, darkMode }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [data, setData] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FiltersState>({
    searchText: "",
    selectedStatus: "",
    startDate: null,
    endDate: null,
  });

  const [filtersVersion, setFiltersVersion] = useState(0);

  const resetFilters = useCallback(() => {
    setFilters({
      searchText: "",
      selectedStatus: "",
      startDate: null,
      endDate: null,
    });
    setFiltersVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (config.useMockData) {
          setData(rawMockData as Driver[]);
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
              user.address.city +
              ", " +
              user.address.zipcode.split("-")[0],
            startDate: "2023-01-01",
          }));
          setData(apiDrivers);
        }
      } catch (err) {
        console.error(err);
        setError(t("error_message"));
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [t]);

  const handleFilterChange = (
    name: keyof FiltersState,
    value: string | Date | null
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      if (
        filters.searchText &&
        !`${row.firstName} ${row.lastName}`
          .toLowerCase()
          .includes(filters.searchText.toLowerCase())
      )
        return false;
      if (filters.selectedStatus && row.status !== filters.selectedStatus)
        return false;
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
      { accessorKey: "firstName", header: t("first_name") },
      { accessorKey: "lastName", header: t("last_name") },
      { accessorKey: "email", header: t("email") },
      { accessorKey: "phoneNumber", header: t("phone_number") },
      { accessorKey: "status", header: t("status") },
      { accessorKey: "location", header: t("location") },
      { accessorKey: "startDate", header: t("start_date") },
    ],
    [t]
  );

  if (isLoading)
    return (
      <Box p={3}>
        <Typography variant="h6">{t("loading")}</Typography>
      </Box>
    );

  if (error)
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          {t("error_message")}
        </Typography>
      </Box>
    );

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{ animation: "fadeIn 0.5s ease-in-out" }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${
            darkMode ? "#333" : "#1976d2"
          } 0%, ${darkMode ? "#111" : "#9c27b0"} 100%)`,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <BackButton
          onClick={resetFilters}
          label={t("Back") || "Clear Filters"}
        />
        <Typography variant="h4" fontWeight="bold">
          {t("Driver Data", {
            source: config.useMockData
              ? t("mock_data")
              : t("api_data"),
          })}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <LanguageSwitcher />
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>

      {/* Responsive: Filters + Table */}
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        gap={3}
      >
        {/* Filter Panel */}
        <Paper
          elevation={3}
          key={`filters-${filtersVersion}`}
          sx={{
            flex: 1,
            minWidth: isMobile ? "100%" : "280px",
            p: 2,
            borderRadius: 3,
            transition: "0.3s",
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : theme.palette.background.paper,
            border: (theme) =>
              theme.palette.mode === "dark"
                ? `1px solid ${theme.palette.divider}`
                : "1px solid transparent",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            // This Typography already uses primary.main, which adapts
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            {t("filters")}
          </Typography>
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Paper>

        {/* Table */}
        <Paper
          elevation={3}
          sx={{
            flex: 3,
            p: 2,
            borderRadius: 3,
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : theme.palette.background.paper,
            border: (theme) =>
              theme.palette.mode === "dark"
                ? `1px solid ${theme.palette.divider}`
                : "1px solid transparent",
          }}
        >
          <MaterialReactTable
            columns={columns}
            data={filteredData}
            enableRowSelection
            enableStickyHeader
            muiTableBodyRowProps={({ row }) => ({
              sx: {
                backgroundColor:
                  row.index % 2 === 0
                    ? "action.hover"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "action.selected",
                },
                transition: "0.2s",
              },
            })}
            muiTablePaperProps={{ sx: { boxShadow: "none" } }}
          />
        </Paper>
      </Box>

      {/* Export Toolbar */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: isMobile ? "center" : "flex-end",
          alignItems: "center",
          p: 2,
          borderRadius: 2,
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : theme.palette.background.paper,
          border: (theme) =>
            theme.palette.mode === "dark"
              ? `1px solid ${theme.palette.divider}`
              : "1px solid transparent",
        }}
      >
        <ExportButtons data={filteredData} />
      </Paper>

      {/* CSS Animation */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </Box>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          ...(darkMode
            ? {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                primary: { main: "#90caf9" }, // Lighter primary for dark mode
                secondary: { main: "#f48fb1" }, // Lighter secondary for dark mode
                text: {
                  primary: "#e0e0e0", // Lighter text for dark mode
                  secondary: "#b0b0b0",
                },
              }
            : {
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
                primary: { main: "#1976d2" },
                secondary: { main: "#9c27b0" },
                text: {
                  primary: "#212121", // Darker text for light mode
                  secondary: "#757575",
                },
              }),
        },
        shape: { borderRadius: 10 },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    </ThemeProvider>
  );
};

export default App;