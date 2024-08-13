export interface TableHeader {
  col_name: string;
  title: string;
  type?: any;
}

export const columns: TableHeader[] = [
  { col_name: 'invoice_id', title: 'ID' },
  { col_name: 'invoice_name', title: 'Name' },
  { col_name: 'funding_source_code', title: 'Funding Source' },
  { col_name: 'funding_source_funding_source_provider', title: 'Funding Source Provider' }, 
  { col_name: 'funding_source_registration_number', title: 'Funding Source Registration Number'},
  { col_name: 'funding_source_invoice_type', title: 'Funding Source Invoice Type'},
  { col_name: 'invoice_type', title: 'Type' },
  { col_name: 'invoice_date_added', title: 'Date Created', type: 'date' },
  { col_name: 'created_by', title: 'Created By' },
  { col_name: 'invoice_total_hours', title: 'Total Hours' },
  { col_name: 'invoice_total_amount', title: 'Total Amount', type: 'currency' },
];

export const selectedColumns: string[] =  [
  'invoice_id',
  'invoice_name', 
  'funding_source_code',
  'funding_source_funding_source_provider',
  'funding_source_registration_number',
  'funding_source_invoice_type',
  'invoice_type', 
  'invoice_date_added',
  'invoice_total_hours',
  'invoice_total_amount',
];
 