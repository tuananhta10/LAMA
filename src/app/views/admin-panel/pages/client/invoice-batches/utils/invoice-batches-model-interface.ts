export interface InvoiceBatches {
  id: string;  
  name: string;  
  funding_source_id: string;
  funding_source_full_name: string;
  type: string;  
  date_created: any; 
  time_created?: any;
  created_by: string;
  start_date?: any;  
  end_date?: any;
  invoice_batch?: any;
  total_hours: number;
  total_amount: number;
}

export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'invoice_id', title: 'ID' },
  { col_name: 'invoice_name', title: 'Name' },
  { col_name: 'funding_source_code', title: 'Funding Source' },
  { col_name: 'invoice_type', title: 'Type' },
  { col_name: 'invoice_date_added', title: 'Date Created', type: 'date' },
  { col_name: 'created_by', title: 'Created By' },
  { col_name: 'invoice_total_hours', title: 'Total Hours' },
  { col_name: 'invoice_total_amount', title: 'Total Amount', type: 'currency' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'invoice_id',
  'invoice_name', 
  'funding_source_code',
  'invoice_type', 
  'invoice_date_added',
  //'created_by',
  'invoice_total_hours',
  'invoice_total_amount',
  //'status',
  'action',
  
];
 
const invoiceBatchesList: InvoiceBatches[] = [
  {
    id: "41230",  
    name: "PLAN - 2022-01-01 to 2022-06-01",  
    funding_source_id: "PLAN",
    funding_source_full_name: "PLAN",
    type: "Invoice",  
    date_created: 1655110992, 
    start_date: 1640966400,  
    end_date: 1641398400,
    time_created: '08:00',
    created_by: 'James Johnson',
    total_hours: 25,
    total_amount: 150,
  },

  {
    id: "41231",  
    name: "PLAN - 2021-01-01 to 2021-06-01",  
    funding_source_id: "PLAN",
    funding_source_full_name: "PLAN",
    type: "Invoice",  
    date_created: 1655110992, 
    start_date: 1609430400,  
    end_date: 1609862400,
    time_created: '08:00',
    created_by: 'James Johnson',
    total_hours: 25,
    total_amount: 150,
  },

  {
    id: "41232",  
    name: "PLAN - 2020-01-01 to 2020-06-01",  
    funding_source_id: "PLAN",
    funding_source_full_name: "PLAN",
    type: "Invoice",  
    date_created: 1655110992, 
    start_date: 1577808000,  
    end_date: 1578240000,
    time_created: '08:00',
    created_by: 'James Johnson',
    total_hours: 25,
    total_amount: 150,
  },
];

export {
  displayedColumns,
  selectedColumns,
  invoiceBatchesList
}