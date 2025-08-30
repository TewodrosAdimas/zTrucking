import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { exportToCSV } from "../utils/exportCsv";
import { exportToExcel } from "../utils/exportExcel";
import { exportToPDF } from "../utils/exportPdf";
import type { Driver } from "../types"; 

interface ExportButtonsProps {
  data: Driver[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ data }) => {
  return (
    <ButtonGroup variant="contained" color="primary">
      <Button onClick={() => exportToCSV(data, "drivers")}>Export CSV</Button>
      <Button onClick={() => exportToExcel(data, "drivers")}>Export Excel</Button>
      <Button onClick={() => exportToPDF(data, "drivers")}>Export PDF</Button>
    </ButtonGroup>
  );
};

export default ExportButtons;
