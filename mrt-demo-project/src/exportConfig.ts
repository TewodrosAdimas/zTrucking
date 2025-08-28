export type ExportType = "CSV" | "Excel" | "PDF";

export const exportOptions: { label: string; type: ExportType }[] = [
  { label: "CSV", type: "CSV" },
  { label: "Excel", type: "Excel" },
  { label: "PDF", type: "PDF" },
];
