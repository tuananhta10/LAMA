export interface EmployeeTimesheet {
  id: string;  
  employee_name: string;
  start_date: any;
  end_date: any;
  total_hours: number;
  approved: any;  
  paid: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'employee_name', title: 'Employee Name' },
  { col_name: 'client_service_schedule_id', title: 'Shift ID' },
  { col_name: 'start_date', title: 'Start Time' },
  { col_name: 'end_date', title: 'End Time' },
  { col_name: 'total_hours', title: 'Total Hours' },
  { col_name: 'approved', title: 'Approved' },
  { col_name: 'paid', title: 'Paid' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id', 
  'employee_name',
  'client_service_schedule_id',
  'start_date',
  'end_date',
  'total_hours',
  'approved',
  'paid',
  'action'
];
 
const employeeTimesheetList: EmployeeTimesheet[] = [
  {
    id: '4123332',  
    employee_name: 'Vicki Smith',
    start_date: 1645027200,
    end_date: 1646130764,
    total_hours: 2.5,
    paid: 'No',
    approved: 'No'
  },
  {
    id: '4123333',  
    employee_name: 'James Kummug',
    start_date: 1645027200,
    end_date: 1646130764,
    total_hours: 2.5,
    paid: 'No',
    approved: 'No'
  }
];

export {
  displayedColumns,
  selectedColumns,
  employeeTimesheetList
}