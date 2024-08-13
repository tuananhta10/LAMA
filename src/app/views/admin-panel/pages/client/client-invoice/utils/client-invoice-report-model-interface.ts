export interface TableHeader {
  col_name: string;
  title: string;
  type?: any;
}

export const columns: TableHeader[] = [
  { col_name: 'invoice_batch_id', title: 'Batch Id' },
  { col_name: 'invoice_batch_claim_reference', title: 'Invoice Reference' },
  { col_name: 'invoice_name', title: 'Invoice Batch'},
  { col_name: 'invoice_type', title: 'Invoice Type'},
  { col_name: 'client_name', title: 'Participant' },
  { col_name: 'invoice_batch_funding_source_code', title: 'Funding Source' },
  { col_name: 'invoice_batch_support_item', title: 'Support Item'},
  { col_name: 'invoice_batch_support_item_number', title: 'Claim Code' },
  { col_name: 'invoice_batch_date_added', title: 'Date Created', type: 'date' },
  { col_name: 'comments', title: 'Comments' },
  { col_name: 'invoice_batch_total_hours', title: 'Total Hours' },
  { col_name: 'invoice_batch_total_cost', title: 'Total Amount', type: 'currency' },
  { col_name: 'invoice_batch_status', title: 'Status' },
  
];

export const selectedColumns: string[] =  [
  'invoice_batch_claim_reference', 
  'invoice_name',
  'client_name',
  'invoice_batch_funding_source_code',
  'invoice_batch_support_item',
  'invoice_batch_support_item_number',
  'invoice_batch_date_added',
  //'comments',
  'invoice_batch_total_hours',
  'invoice_batch_total_cost',
  'invoice_batch_status',
];
 