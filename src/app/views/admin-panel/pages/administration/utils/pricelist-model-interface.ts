export interface PriceList {
  id: string;  
  type: string;   
  name: string;  
  effective_date_from: any;
  effective_date_to: any;
  effective_time_from: any;
  effective_time_to: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: "id", title: "ID" },
  { col_name: "name", title: "Name" },
  { col_name: "type", title: "Type" },
  { col_name: "effective_date_from", title: "Effective From" },
  { col_name: "effective_date_to", title: "Effective To" },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  "id",
  "name",
  "type", 
  "effective_date_from",
  "effective_date_to",
  "action"
];
 
const pricelistList: PriceList[] = [
  {
    id: "41230", 
    name: "SW Casual pay rate", 
    type: "Pay Rates",
    effective_date_from: "02-02-2021",
    effective_date_to: "02-03-2023",
    effective_time_from: "00:00",
    effective_time_to: "00:00",
  },

  {
    id: "41231", 
    name: "NDIS - METRO", 
    type: "Charge Rates",
    effective_date_from: "02-02-2021",
    effective_date_to: "02-03-2023",
    effective_time_from: "00:00",
    effective_time_to: "00:00",
  },

  {
    id: "41232", 
    name: "SL Payrate", 
    type: "Pay Rates",
    effective_date_from: "02-02-2021",
    effective_date_to: "02-03-2023",
    effective_time_from: "00:00",
    effective_time_to: "00:00",
  },

  {
    id: "41233", 
    name: "Carers Gateway", 
    type: "Charge Rates",
    effective_date_from: "02-02-2021",
    effective_date_to: "02-03-2023",
    effective_time_from: "00:00",
    effective_time_to: "00:00",
  },
];

export {
  displayedColumns,
  selectedColumns,
  pricelistList
}