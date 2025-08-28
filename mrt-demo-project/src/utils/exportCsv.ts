import type { Driver } from "../types";

export const exportToCSV = (data: Driver[], fileName: string) => {
  if (!data.length) return;

  const headers = Object.keys(data) as (keyof Driver)[];
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((field) => JSON.stringify(row[field] ?? "")).join(",")
    ),
  ];

  const csvString = csvRows.join("\r\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
