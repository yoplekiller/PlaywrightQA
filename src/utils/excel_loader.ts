import ExcelJS from 'exceljs';
import * as path from 'path';

export interface SearchCase {
  tc_id: string;
  search_term: string;
}


//엑셀 파일에서 테스트 케이스 데이터를 로드하는 함수
export async function loadExcelFile(filePath: string): Promise<SearchCase[]> {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(__dirname, filePath);
  if (!require('fs').existsSync(absolutePath)) {
    throw new Error(`Excel file not found at path: ${absolutePath}`);
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(absolutePath);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error('No worksheet found in Excel file');
  }

  const rawData: SearchCase[] = [];
  const headers: string[] = [];

  worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
    if (rowNumber === 1) {
      // Header row
      row.eachCell((cell: ExcelJS.Cell) => {
        headers.push(cell.value?.toString() ?? '');
      });
    } else {
      // Data rows
      interface RowData {
        [key: string]: string;
      }
      const rowData: RowData = {};
      row.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
        const header: string = headers[colNumber - 1];
        if (header) {
          rowData[header] = cell.value?.toString() ?? '';
        }
      });
      rawData.push({
        tc_id: rowData.tc_id?.toString() ?? '',
        search_term: rowData.search_term?.toString() ?? '',
      });
    }
  });

  return rawData;
}
