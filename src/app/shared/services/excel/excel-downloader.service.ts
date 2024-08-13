import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXSTYLE from 'xlsx-js-style';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.csv';

@Injectable({
  providedIn: 'root'
})
export class ExcelDownloaderService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'csv', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }


  public exportAsExcelHtml(id: any, excelFileName: string, headerArr?: string[], excludeIndex?: number): void {
    console.log(headerArr)

    /* table id is passed over here */   
    const element = document.getElementById(id); 
    const ws: XLSXSTYLE.WorkSheet = XLSXSTYLE.utils.table_to_sheet(element, {display: true});

    /* generate workbook and add the worksheet */
    const wb: XLSXSTYLE.WorkBook = XLSXSTYLE.utils.book_new();
   
    XLSXSTYLE.utils.book_append_sheet(wb, ws, 'Sheet1');

    for(let item in wb.Sheets['Sheet1']){
      let index = headerArr?.findIndex(el => el === wb.Sheets['Sheet1'][item]?.v);

      if(index > -1){
        wb.Sheets['Sheet1'][item]['s'] = { 
          font: { name: "Arial", sz: 11, color: { rgb: "512C77"} },
          fill: { fgColor: { rgb: "F4F3FB" } },
          border: { bottom: { style: 'thick', color: { rgb: "999999"} } },
          alignment: { vertical: 'center' }
        };
      }

      else if(index === -1 && !!wb.Sheets['Sheet1'][item]['v']){
        wb.Sheets['Sheet1'][item]['s'] = { 
          font: { name: "Arial", sz: 11, color: { rgb: "212121"} },
          alignment: { vertical: 'center' }
        };
      }

      else if(!index && !!wb.Sheets['Sheet1'][item]['v']){
        wb.Sheets['Sheet1'][item]['s'] = { 
          font: { name: "Arial", sz: 11, color: { rgb: "212121"} },
          alignment: { vertical: 'center' }
        };
      }
    }

    wb.Sheets['Sheet1']['A1']['s'] = { 
      font: { name: "Arial", sz: 12, color: { rgb: "512C77"} },
      fill: { fgColor: { rgb: "F4F3FB" } }
    };

    /* save to file */
    XLSXSTYLE.writeFile(wb, `${excelFileName}.xlsx`);
  }

  public exportAsExcelHtmlCompliance(id: any, excelFileName: string, headerArr?: string[]): void {
    /* table id is passed over here */   
    const element = document.getElementById(id); 
    const ws: XLSXSTYLE.WorkSheet = XLSXSTYLE.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSXSTYLE.WorkBook = XLSXSTYLE.utils.book_new();
   
    XLSXSTYLE.utils.book_append_sheet(wb, ws, 'Sheet1');

    for(let item in wb.Sheets['Sheet1']){
      let index = headerArr?.findIndex(el => el === wb.Sheets['Sheet1'][item]?.v);
      let text = wb.Sheets['Sheet1'][item]?.v;

      if(index > -1){
        wb.Sheets['Sheet1'][item]['s'] = { 
          font: { name: "Arial", sz: 11, color: { rgb: "512C77"} },
          fill: { fgColor: { rgb: "F4F3FB" } },
          border: { bottom: { style: 'thick', color: { rgb: "999999"} } },
          alignment: { vertical: 'center' }
        };
      }

      else if(index === -1 && !!wb.Sheets['Sheet1'][item]['v']
        && !JSON.stringify(text)?.match('Expired')
        && !JSON.stringify(text)?.match('Valid')){
        wb.Sheets['Sheet1'][item]['s'] = { 
          font: { name: "Arial", sz: 11, color: { rgb: "212121"} },
          alignment: { vertical: 'center' }
        };
      }

      else if(!index && !!wb.Sheets['Sheet1'][item]['v']
        && !JSON.stringify(text)?.match('Expired')
        && !JSON.stringify(text)?.match('Valid')){
        wb.Sheets['Sheet1'][item]['s'] = { 
          font: { name: "Arial", sz: 11, color: { rgb: "212121"} },
          alignment: { vertical: 'center' }
        };
      }

      else if(JSON.stringify(text)?.match('Valid')){
        wb.Sheets['Sheet1'][item]['s'] = { 
          font: { name: "Arial", sz: 11, color: { rgb: "318a2d"} },
          fill: { fgColor: { rgb: "E5F2E5" } },
          alignment: { vertical: 'center' }
        };
      }

      else if(JSON.stringify(text)?.match('Expired')){
        wb.Sheets['Sheet1'][item]['s'] = { 
          font: { name: "Arial", sz: 11, color: { rgb: "d62929"} },
          fill: { fgColor: { rgb: "FFE5E5" } },
          alignment: { vertical: 'center' }
        };
      }
    }

    wb.Sheets['Sheet1']['A1']['s'] = { 
      font: { name: "Arial", sz: 12, color: { rgb: "512C77"} },
      fill: { fgColor: { rgb: "F4F3FB" } }
    };

    /* save to file */
    XLSXSTYLE.writeFile(wb, `${excelFileName}.xlsx`);
  }


}
