// utils/exportExcel.ts
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (
  data: any[], 
  fileName: string = "export",
  columnsToInclude:string[]
) => {

  const filteredData = columnsToInclude 
  ? data.map((row)=>{
    const filteredRow: any = {};
    columnsToInclude.forEach((key)=>{
      if(key in row) filteredRow[key] = row[key]
    });
    return filteredRow
  }):data;
  // Tạo worksheet từ data (dạng mảng object)
  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Tạo file Excel và lưu
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
};
