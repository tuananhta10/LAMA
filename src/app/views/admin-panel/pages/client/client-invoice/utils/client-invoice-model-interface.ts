export interface Invoices {
  invoice_id: string;  
  invoice_name: string;  
  invoice_batch_date_added: any; 
  invoice_batch?: any;
  client_name: string;
  client_id?: any; 
  account?: any;
  brokerage_number: any;  
  comments: string;
  sub_total?: number;
  tax?: number;
  invoice_batch_total_cost: number;
  invoice_batch_status: any;
  emailed?: boolean;  
  amount_paid?: number;  
  payment_reference_number?: number;
  invoice_batch_support_item_number: any;  
  funding_source_id: string;
  invoice_batch_funding_source_code: string;
  invoice_batch_total_hours: number;
}

export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'invoice_batch_id', title: 'Batch Id' },
  { col_name: 'invoice_batch_claim_reference', title: 'Invoice Reference' },
  { col_name: 'invoice_name', title: 'Invoice Batch'},
  { col_name: 'client_name', title: 'Participant' },
  { col_name: 'invoice_batch_funding_source_code', title: 'Funding Source' },
  { col_name: 'invoice_batch_support_item_number', title: 'Claim Code' },
  { col_name: 'invoice_batch_date_added', title: 'Date Created', type: 'date' },
  { col_name: 'comments', title: 'Comments' },
  { col_name: 'invoice_batch_total_hours', title: 'Total Hours' },
  { col_name: 'invoice_batch_total_cost', title: 'Total Amount', type: 'currency' },
  { col_name: 'invoice_batch_status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'invoice_batch_claim_reference', 
  'invoice_name',
  'client_name',
  'invoice_batch_funding_source_code',
  'invoice_batch_support_item_number',
  'invoice_batch_date_added',
  //'comments',
  'invoice_batch_total_hours',
  'invoice_batch_total_cost',
  'invoice_batch_status',
  'action'
  //'invoice_batch_status',
];
 
const invoicesList: Invoices[] = [
  {
    invoice_id: "41230",  
    invoice_name: "9-455-45-Damien James",  
    client_name: 'Damien James',
    funding_source_id: "NDIS",
    invoice_batch_funding_source_code: "NDIS",
    brokerage_number: "",
    invoice_batch_support_item_number: "02_444_123_11",
    comments:"Pay Reference: 441234410",
    invoice_batch_date_added: 1655110992, 
    invoice_batch_total_hours: 25,
    invoice_batch_total_cost: 150,
    invoice_batch: 'PLAN - 2022-01-01 to 2022-06-01',
    invoice_batch_status: 'Paid'
  },

  {
    invoice_id: "41231",  
    invoice_name: "1-455-45-Damien James",  
    client_name: 'Damien James',
    funding_source_id: "NDIS",
    invoice_batch_funding_source_code: "NDIS",
    brokerage_number: "",
    invoice_batch_support_item_number: "04_134_523_21",
    comments:"Pay Reference: 341234410",
    invoice_batch_date_added: 1655110992, 
    invoice_batch_total_hours: 3,
    invoice_batch_total_cost: 55,
    invoice_batch: 'PLAN - 2021-01-01 to 2021-06-01',
    invoice_batch_status: 'Paid'
  },

  {
    invoice_id: "41232",  
    invoice_name: "4-112-33-Damien James",  
    client_name: 'Damien James',
    funding_source_id: "NDIS",
    invoice_batch_funding_source_code: "NDIS",
    brokerage_number: "",
    invoice_batch_support_item_number: "05_124_123_11",
    comments:"Pay Reference: 541234410",
    invoice_batch_date_added: 1655110992, 
    invoice_batch_total_hours: 10,
    invoice_batch_total_cost: 222,
    invoice_batch: 'PLAN - 2020-01-01 to 2020-06-01',
    invoice_batch_status: 'Paid'
  },
];

export {
  displayedColumns,
  selectedColumns,
  invoicesList
}