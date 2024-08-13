import moment from "moment";

export class AdminHelper {
    static formatDateFromTimestamp(timestamp: number): string {
      const date = new Date(timestamp * 1000);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
  
      return `${month}-${day}-${year}`;
    }

    static formatDateToStandard(timestamp: number){

      const date = this.formatDateFromTimestamp(timestamp)

      const originalDate = new Date(date);
      const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ];
      const month = monthNames[originalDate.getMonth()];
      const day = originalDate.getDate();
      const year = originalDate.getFullYear();
      const formattedDate = `${month.toLowerCase()} ${day}, ${year}`;

      return formattedDate.toUpperCase();
    }

    static formatDate(data:any[], dateColumns:any[]){

      const date_col = dateColumns.filter(res => res.col_name.includes('date'))
      const formatted = data.map(item => {
          if (date_col.length == 0) return { ...item }
          for(let i = 0; i < date_col.length; i++){
            const formattedDate = typeof item[date_col[i].col_name] === 'string' 
                                  ? item[date_col[i].col_name] 
                                  : AdminHelper.formatDateFromTimestamp(item[date_col[i].col_name]);
            item[date_col[i].col_name] = formattedDate
          }
          return { ...item };
        });

      return formatted
    }

    static dateGmt(date){
      let formattedDate
      let gmtDate
      if( typeof date == 'number'){
        formattedDate = new Date(date * 1000)
        gmtDate = new Date(formattedDate.getTime() + formattedDate.getTimezoneOffset() * 60000);

      }else{
        formattedDate = new Date(date);
        gmtDate = new Date(formattedDate.getTime() - (8 * 60 * 60 * 1000)).toString();
      }
      return gmtDate
    }
    
    
    static replaceSpaces(data, char:string):string {

      let replaced = data.replace(/ /g, char);
      
      return replaced
    }

    static convert24Hour(time12h: any){
      if(!time12h) return time12h
      return moment(time12h, 'hh:mm A').format('HH:mm')
    }

    static deepCopy(obj) {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
    
      if (Array.isArray(obj)) {
        const newArray = [];
        for (let i = 0; i < obj.length; i++) {
          newArray[i] = this.deepCopy(obj[i]);
        }
        return newArray;
      }
    
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = this.deepCopy(obj[key]);
        }
      }
      return newObj;
    }

    static excelCellTextFormat(value,format){
      return `=TEXT("${value}", "${format}")`
    }

    static formatDateGmt(date: Date, locale: string, options: Intl.DateTimeFormatOptions): string {
      return new Intl.DateTimeFormat(locale, options).format(date);
    }
  }