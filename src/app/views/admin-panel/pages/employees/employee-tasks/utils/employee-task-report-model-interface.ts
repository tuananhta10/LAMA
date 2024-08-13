export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

export const columns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'task_name', title: 'Task Name' },
  { col_name: 'employee_name', title: 'Assigned To' },
  { col_name: 'due_date', title: 'Due Date' },
  { col_name: 'description', title: 'Description' },
  { col_name: 'status', title: 'Status' },
];

export const selectedColumns: string[] =  [
  'id', 
  'task_name',
  'employee_name',
  'due_date', 
  'description',
  'status',
];
 