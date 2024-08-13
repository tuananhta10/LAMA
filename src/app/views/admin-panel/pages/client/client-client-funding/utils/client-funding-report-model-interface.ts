export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

export const columns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'client_name', title: 'Participant' },
  { col_name: 'funding_source_id', title: 'Funding Source ID' },
  { col_name: 'funding_source_code', title: 'Funding Source' },
  //{ col_name: 'type', title: 'Type' },
  { col_name: 'funding_type', title: 'Type' },
  { col_name: 'start_date', title: 'Start Date' },
  { col_name: 'end_date', title: 'End Date' },
  { col_name: 'budget', title: 'Budget', type: 'currency' },
  { col_name: 'allocated', title: 'Planned', type: 'currency' },
  { col_name: 'utilise_running_total', title: 'Utilised Total', type: 'currency' },
  { col_name: 'balance', title: 'Balance', type: 'currency' },
  { col_name: 'registration_no', title: 'Registration Number' },
  { col_name: 'branch_name', title: 'Branch' },
  { col_name: 'branch_id', title: 'Branch ID' },
];

export const selectedColumns: string[] =  [
  'id',
  'client_name', 
  'funding_source_id',
  'funding_source_code',
  //'type',
  'funding_type',
  'start_date',
  'end_date',
  'budget',
  'allocated',
  'utilise_running_total',
  'balance',
  'registration_no',
  'branch_name',
];
 