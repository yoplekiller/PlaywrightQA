import * as XLSX from 'xlsx';

export function loadExcelFile(filePath: string): any[] {
    // Read the Excel file
    const workbook = XLSX.readFile('./test_case.xlsx');


    // Get the data from the first sheet
    const worksheet = workbook.Sheets['상품목록'];

    // Convert the sheet to JSON format
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 0 });

    return jsonData;
}