import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Driver } from "../types";

export const exportToPDF = (data: Driver[], fileName: string) => {
  const doc = new jsPDF();

  doc.text(fileName, 14, 16);

  const tableColumn = ["First Name", "Last Name", "Email", "Phone", "Status", "Location", "Start Date"];
  const tableRows = data.map((driver) => [
    driver.firstName,
    driver.lastName,
    driver.email,
    driver.phoneNumber ?? "",
    driver.status ?? "",
    driver.location ?? "",
    driver.startDate ?? "",
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save(`${fileName}.pdf`);
};
