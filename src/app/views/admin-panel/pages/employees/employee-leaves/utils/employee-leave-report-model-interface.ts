export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

export const columns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'employee_name', title: 'Employee Name' },
  { col_name: 'start_date', title: 'Leave From' },
  { col_name: 'end_date', title: 'Leave To' },
  { col_name: 'start_time', title: 'Start Time' },
  { col_name: 'end_time', title: 'End Time' },
  { col_name: 'reasons', title: 'Leave Reason' },
  { col_name: 'status', title: 'Status' },
];

export const selectedColumns: string[] =  [
  'id', 
  'employee_name',
  'start_date',
  'end_date',
  'start_time',
  'end_time',
  'reasons',
  'status',
];
 