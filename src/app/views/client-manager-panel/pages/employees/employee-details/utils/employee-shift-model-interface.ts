export interface EmployeeShift {
  id: string;  
  name: string;  
  type: string;  
  work_schedule: string;
  employee: string;  
  status: string;  
  week_day: string;  
  start_day: string; 
  time_from: string; 
  time_to: string; 
  total_hours: string; 
  group: string;  
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Activity' },
  { col_name: 'type', title: 'Type' },
  { col_name: 'start_date', title: 'Start Date' },
  { col_name: 'end_date', title: 'End Date' },
  { col_name: 'employee_name', title: 'Employee Name' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'weekday', title: 'Week Day' },
  //{ col_name: 'start_day', title: 'Start Date' },
  { col_name: 'time_from', title: 'Time From' },
  { col_name: 'time_to', title: 'Time To' },
  { col_name: 'total_hours', title: 'Total Hours' },
  { col_name: 'group', title: 'Groups' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'employee_name', 
  'type',
  'name', 
  'start_date',
  'end_date', 
  //'start_day',
  'time_from',
  'time_to',
  'total_hours',
  'status', 
  'action'
];
 
const employeeShiftList: EmployeeShift[] = [];

export {
  displayedColumns,
  selectedColumns,
  employeeShiftList
}