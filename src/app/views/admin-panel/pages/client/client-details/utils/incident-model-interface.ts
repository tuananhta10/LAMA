export interface Incidents {
  id: string;  
  client_name: string;  
  employee_name?: string;
  reported_by?: string;
  type: string;  
  action_date: any;  
  date_received: any;  
  description: any;  
  employee: any;
  status: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'client_name', title: 'Client' },
  { col_name: 'type', title: 'Type' },
  { col_name: 'employee_name', title: 'Employee' },
  { col_name: 'reported_by', title: 'Reported By' },
  { col_name: 'action_date', title: 'Action Date' },
  { col_name: 'date_received', title: 'Date Received' },
  { col_name: 'description', title: 'Description' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id', 
  //'client_name',
  'type',
  'employee_name',
  'reported_by',
  'action_date',
  'date_received',
  'description',
  'status',  
  'action'
];

export {
  displayedColumns,
  selectedColumns
}