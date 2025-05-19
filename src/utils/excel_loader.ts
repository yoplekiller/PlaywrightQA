import XLSX from 'xlsx';
import * as path from 'path';

export interface SearchCase {
  tc_id: string;
  search_term: string;
}

export function loadExcelFile(filePath: string): SearchCase[] {
  const absolutePath = path.resolve(__dirname, filePath); // Adjusted path resolution
  if (!require('fs').existsSync(absolutePath)) {
    throw new Error(`Excel file not found at path: ${absolutePath}`);
  }
  const workbook = XLSX.readFile(absolutePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const rawData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

  return rawData.map((row: any) => ({
    tc_id: row.tc_id?.toString() ?? '',
    search_term: row.search_term?.toString() ?? '',
  }));
}
