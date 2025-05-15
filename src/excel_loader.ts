import XLSX from 'xlsx';
import * as path from 'path';

export function loadExcelFile(filePath: string): any[] {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const workbook = XLSX.readFile(absolutePath);
    const sheetName = workbook.SheetNames[0]; // '상품목록' 대신 자동 처리
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 0 });

    return jsonData;
}
