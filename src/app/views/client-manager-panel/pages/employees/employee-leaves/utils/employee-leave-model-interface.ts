export interface EmployeeLeave {
  id: string;  
  employee_name: string;
  start_date: string;
  end_date: string;
  reasons: string;
  status: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'employee_name', title: 'Employee Name' },
  { col_name: 'start_date', title: 'Leave From' },
  { col_name: 'end_date', title: 'Leave To' },
  { col_name: 'reasons', title: 'Leave Reason' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id', 
  'employee_name',
  'start_date',
  'end_date',
  'reasons',
  'status',
  'action'
];
 
const employeeLeaveList: EmployeeLeave[] = [
  {
    id: '4123332',  
    employee_name: 'Vicki Smith',
    start_date: '13-01-2022',
    end_date: '13-11-2022',
    reasons: 'Annual Leave',
    status: 'Approved',
  },
  {
    id: '4123333',  
    employee_name: 'Vicki Smith',
    start_date: '13-01-2022',
    end_date: '13-11-2022',
    reasons: 'Unpaid Leave',
    status: 'Approved',
  }
];

export {
  displayedColumns,
  selectedColumns,
  employeeLeaveList
}